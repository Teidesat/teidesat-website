/* =================================================================
   TEIDESAT — Fix de navegación (Odoo 17 website)

   PROBLEMA:
   Al navegar entre páginas en Odoo, el sistema aplica transiciones
   CSS (opacity, transform) a #wrapwrap o sus descendientes. Si la
   restauración falla, el nuevo contenido queda invisible aunque
   el fondo y los elementos absolutos sí se renderizan.
   Esto afecta a TODAS las páginas, incluyendo la 404.

   SOLUCIÓN:
   - Limpiar cualquier opacity/visibility que Odoo haya inyectado
   - Forzar .reveal-up visible (en móvil inmediatamente, en desktop
     con IntersectionObserver re-iniciado)
   - Escuchar todos los eventos de navegación posibles
   - Usar MutationObserver como red de seguridad
================================================================= */

(function () {
    'use strict';

    var REVEAL  = 'reveal-up';
    var VISIBLE = 'is-visible';
    var MOBILE  = 767;   // px

    // ── 1. LIMPIAR OPACIDAD INYECTADA POR ODOO ──────────────────
    function clearOdooOverlay() {
        // Odoo aplica transiciones de opacidad a estos contenedores
        ['wrapwrap', 'wrap'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            el.style.removeProperty('opacity');
            el.style.removeProperty('visibility');
            el.style.removeProperty('transform');
            el.style.removeProperty('transition');
        });

        // También limpiar main y wrappers teidesat
        document.querySelectorAll(
            'main, .teidesat-main, .o_main_content'
        ).forEach(function (el) {
            el.style.removeProperty('opacity');
            el.style.removeProperty('visibility');
        });
    }

    // ── 2. ACTIVAR ANIMACIONES REVEAL ───────────────────────────
    var _observer = null;

    function resetObserver() {
        if (_observer) { _observer.disconnect(); _observer = null; }
    }

    function buildObserver() {
        if (!window.IntersectionObserver) return null;
        return new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add(VISIBLE);
                    _observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    }

    function triggerReveal() {
        var mobile = window.innerWidth <= MOBILE;

        document.querySelectorAll('.' + REVEAL).forEach(function (el) {
            if (mobile) {
                // Móvil: visible inmediatamente (sin IntersectionObserver)
                el.classList.add(VISIBLE);
            } else if (!el.classList.contains(VISIBLE)) {
                // Desktop: usar observer
                if (!_observer) _observer = buildObserver();
                if (_observer) _observer.observe(el);
                else el.classList.add(VISIBLE); // Fallback sin IO
            }
        });
    }

    // ── 3. ESTRELLAS 404 (re-generar si se perdieron) ────────────
    function initStars() {
        var field = document.getElementById('hs-stars-field');
        if (!field || field.children.length > 0) return;

        var frag = document.createDocumentFragment();
        for (var i = 0; i < 80; i++) {
            var s   = document.createElement('div');
            var sz  = (Math.random() * 2.5 + 0.5).toFixed(1);
            s.className = 'hs-star';
            s.style.cssText = [
                'width:'   + sz + 'px',
                'height:'  + sz + 'px',
                'top:'     + (Math.random() * 100).toFixed(2) + '%',
                'left:'    + (Math.random() * 100).toFixed(2) + '%',
                '--dur:'   + (Math.random() * 3 + 2).toFixed(1) + 's',
                '--delay:-'+ (Math.random() * 4).toFixed(1) + 's'
            ].join(';');
            frag.appendChild(s);
        }
        field.appendChild(frag);
    }

    // ── 4. PUNTO DE ENTRADA ──────────────────────────────────────
    function init() {
        clearOdooOverlay();
        resetObserver();
        triggerReveal();
        initStars();
    }

    // Carga inicial del documento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    // Garantía adicional tras cargar todos los recursos
    window.addEventListener('load', function () { setTimeout(init, 50); });

    // ── 5. INTERCEPTAR NAVEGACIÓN ────────────────────────────────
    // Odoo 17 website usa history.pushState para navegación interna
    var _origPush    = history.pushState.bind(history);
    var _origReplace = history.replaceState.bind(history);

    history.pushState = function () {
        _origPush.apply(this, arguments);
        setTimeout(init, 80);
        setTimeout(init, 350);  // Segundo disparo por si Odoo tarda
    };

    history.replaceState = function () {
        _origReplace.apply(this, arguments);
        setTimeout(init, 80);
        setTimeout(init, 350);
    };

    window.addEventListener('popstate', function () {
        setTimeout(init, 80);
    });

    // Eventos propios de Odoo website (distintas versiones usan distintos nombres)
    [
        'page:load',
        'content_changed',
        'website.dom_ready',
        'dom_updated'
    ].forEach(function (evt) {
        document.addEventListener(evt, init);
    });

    // ── 6. MUTATIONOBSERVER — Red de seguridad ────────────────────
    // Detecta cuándo Odoo inyecta nuevo contenido en el DOM
    // y dispara init() automáticamente.
    new MutationObserver(function (mutations) {
        var hasNewContent = mutations.some(function (m) {
            if (m.type !== 'childList' || !m.addedNodes.length) return false;
            for (var i = 0; i < m.addedNodes.length; i++) {
                var n = m.addedNodes[i];
                // Ignorar estrellitas y nodos de texto
                if (n.nodeType !== 1) continue;
                if (n.id === 'hs-stars-field') continue;
                if (n.classList && n.classList.contains('hs-star')) continue;
                return true;  // Nodo relevante encontrado
            }
            return false;
        });

        if (hasNewContent) {
            setTimeout(init, 50);
        }
    }).observe(document.body, { childList: true, subtree: true });

})();