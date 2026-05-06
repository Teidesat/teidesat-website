function initTeidesatPage() {
    console.log("TEIDESAT JS cargado");

/* =========================================================
NAVEGACIÓN FLOTANTE
========================================================= */

const floatingNav = document.getElementById("teidesat-floating-nav");
const floatingNavToggle = document.getElementById("teidesat-floating-nav-toggle");

function closeFloatingNav() {
    if (!floatingNav || !floatingNavToggle) return;

    floatingNav.classList.remove("is-open");
    floatingNavToggle.setAttribute("aria-expanded", "false");
}

function isMobileViewport() {
    return window.matchMedia("(max-width: 767px)").matches;
}

function goToFloatingSection(selector) {
    const target = document.querySelector(selector);

    if (!target) {
        console.warn("No se encontró la sección:", selector);
        return;
    }

    closeFloatingNav();

    setTimeout(function () {
        if (isMobileViewport()) {
            /*
               En móvil dejamos exactamente el sistema que ya te funciona.
            */
            if (window.location.hash === selector) {
                history.replaceState(null, "", window.location.pathname + window.location.search);
            }

            window.location.hash = selector;

            setTimeout(function () {
                target.scrollIntoView({
                    behavior: "auto",
                    block: "start"
                });
            }, 80);

            return;
        }

        /*
           En PC usamos el sistema simple que ya funcionaba antes,
           pero con animación suave.
        */
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 80);
}

if (floatingNav && floatingNavToggle) {
    floatingNavToggle.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = floatingNav.classList.toggle("is-open");
        floatingNavToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    floatingNav.onclick = function (event) {
        const item = event.target.closest(".teidesat-floating-nav__item");

        if (!item) return;

        event.preventDefault();
        event.stopPropagation();

        const targetSelector = item.getAttribute("data-scroll-target");

        goToFloatingSection(targetSelector);
    };

    document.addEventListener("click", function (event) {
        if (!floatingNav.contains(event.target)) {
            closeFloatingNav();
        }
    });
}

    /* =========================================================
       HERO SEGÚN HORA
    ========================================================= */

    const hero = document.querySelector(".teidesat-hero");

    if (hero) {
        const hour = new Date().getHours();

        hero.classList.remove(
            "teidesat-hero--morning",
            "teidesat-hero--day",
            "teidesat-hero--evening",
            "teidesat-hero--night"
        );

        if (hour >= 5 && hour < 8) {
            hero.classList.add("teidesat-hero--morning");
        } else if (hour >= 8 && hour < 17) {
            hero.classList.add("teidesat-hero--day");
        } else if (hour >= 17 && hour < 20) {
            hero.classList.add("teidesat-hero--evening");
        } else {
            hero.classList.add("teidesat-hero--night");
        }
    }

    /* =========================================================
       MENÚ LATERAL
    ========================================================= */

    const menuToggle = document.getElementById("teidesat-menu-toggle");
    const menuClose = document.getElementById("teidesat-menu-close");
    const sideMenu = document.getElementById("teidesat-side-menu");
    const menuOverlay = document.getElementById("teidesat-menu-overlay");

    function openMenu() {
        if (!sideMenu || !menuOverlay || !menuToggle) return;
        sideMenu.classList.add("is-open");
        menuOverlay.classList.add("is-open");
        sideMenu.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        document.body.classList.add("teidesat-menu-open");
    }

    function closeMenu() {
        if (!sideMenu || !menuOverlay || !menuToggle) return;
        sideMenu.classList.remove("is-open");
        menuOverlay.classList.remove("is-open");
        sideMenu.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("teidesat-menu-open");
    }

    if (menuToggle && menuToggle.dataset.bound !== "true") {
        menuToggle.addEventListener("click", openMenu);
        menuToggle.dataset.bound = "true";
    }

    if (menuClose && menuClose.dataset.bound !== "true") {
        menuClose.addEventListener("click", closeMenu);
        menuClose.dataset.bound = "true";
    }

    if (menuOverlay && menuOverlay.dataset.bound !== "true") {
        menuOverlay.addEventListener("click", closeMenu);
        menuOverlay.dataset.bound = "true";
    }

    if (sideMenu && sideMenu.dataset.linksBound !== "true") {
        sideMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
        sideMenu.dataset.linksBound = "true";
    }

    /* =========================================================
       REVEAL ANIMATIONS
    ========================================================= */

    function initRevealAnimations() {
        const revealItems = document.querySelectorAll(".reveal-up");

        if (!revealItems.length) return;

        if (!("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        revealItems.forEach((item) => observer.observe(item));
    }

    initRevealAnimations();

    /* =========================================================
       FIX ABOUT HASH
    ========================================================= */

    const aboutPage = document.querySelector(".teidesat-page--about");

    if (aboutPage && window.location.hash === "#hero") {
        history.replaceState(null, "", window.location.pathname);
        window.scrollTo(0, 0);
    }

    /* =========================================================
       OBJETIVOS
    ========================================================= */

    const objectivesSection = document.getElementById("objetivos");
    const system = document.querySelector(".teidesat-objectives-system");
    const nodes = document.querySelectorAll(".objective-node");
    const toggleAllButton = document.getElementById("objectives-toggle-all");

    if (system && nodes.length) {
        function setObjectiveState(target, isActive) {
            const node = system.querySelector(`.objective-node[data-target="${target}"]`);
            const panel = document.querySelector(`.objective-panel[data-panel="${target}"]`);

            if (node) node.classList.toggle("active", isActive);
            if (panel) panel.classList.toggle("active", isActive);
        }

        function areAllOpen() {
            return Array.from(nodes).every((node) => node.classList.contains("active"));
        }

        function updateObjectivesHeadingVisibility() {
            if (!objectivesSection) return;

            const hasAnyOpen = Array.from(nodes).some((node) =>
                node.classList.contains("active")
            );

            objectivesSection.classList.toggle("has-active-objective", hasAnyOpen);
        }

        nodes.forEach((node) => {
            if (node.dataset.bound === "true") return;

            node.addEventListener("click", function () {
                const target = this.getAttribute("data-target");
                const nextState = !this.classList.contains("active");
                setObjectiveState(target, nextState);
                updateObjectivesHeadingVisibility();
            });

            node.dataset.bound = "true";
        });

        if (toggleAllButton && toggleAllButton.dataset.bound !== "true") {
            toggleAllButton.addEventListener("click", function () {
                const openAll = !areAllOpen();

                nodes.forEach((node) => {
                    const target = node.getAttribute("data-target");
                    setObjectiveState(target, openAll);
                });

                updateObjectivesHeadingVisibility();
            });

            toggleAllButton.dataset.bound = "true";
        }

        updateObjectivesHeadingVisibility();

        const orbitConfigs = [
            { orbit: 1, duration: 11, offset: 0.08 },
            { orbit: 2, duration: 17, offset: 0.30 },
            { orbit: 3, duration: 23, offset: 0.52 },
            { orbit: 4, duration: 29, offset: 0.72 },
            { orbit: 5, duration: 37, offset: 0.90 }
        ];

        function animateOrbits() {
            const now = performance.now() / 1000;
            const svg = system.querySelector(".objectives-orbits-svg");

            if (!svg) {
                requestAnimationFrame(animateOrbits);
                return;
            }

            const viewBox = svg.viewBox.baseVal;
            const scaleX = system.clientWidth / viewBox.width;
            const scaleY = system.clientHeight / viewBox.height;

            orbitConfigs.forEach((config) => {
                const path = document.getElementById(`orbit-path-${config.orbit}`);
                const node = system.querySelector(`.objective-node[data-orbit="${config.orbit}"]`);

                if (!path || !node) return;

                const length = path.getTotalLength();
                const progress = ((now / config.duration) + config.offset) % 1;
                const point = path.getPointAtLength(length * progress);

                node.style.left = `${point.x * scaleX}px`;
                node.style.top = `${point.y * scaleY}px`;
            });

            requestAnimationFrame(animateOrbits);
        }

        if (!system.dataset.animationStarted) {
            system.dataset.animationStarted = "true";
            requestAnimationFrame(animateOrbits);
        }
    }

    /* =========================================================
    FAQ
    ========================================================= */

    const faqItems = document.querySelectorAll(".teidesat-faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".teidesat-faq-item__question");

        if (!question || question.dataset.bound === "true") return;

        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });

        question.dataset.bound = "true";
    });

    /* =========================================================
    NEWS SLIDER
    ========================================================= */

    const newsSlider = document.querySelector('[data-slider="news"]');

    if (newsSlider) {
        const viewport = newsSlider.querySelector('.teidesat-news-slider__viewport');
        const track = newsSlider.querySelector('.teidesat-news-slider__track');
        const dotsContainer = newsSlider.querySelector('.teidesat-news-slider__dots');
        const cards = Array.from(newsSlider.querySelectorAll('.teidesat-news-card'));

        let currentPage = 0;
        let cardsPerPage = 3;
        let totalPages = 1;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchCurrentX = 0;
        let isTouchingSlider = false;
        let isHorizontalSwipe = false;

        function getCardsPerPage() {
            const width = window.innerWidth;

            if (width <= 767) return 1;
            if (width <= 1199) return 2;
            return 3;
        }

        function updateSliderClasses() {
            newsSlider.classList.remove('is-1-col', 'is-2-col');

            if (cardsPerPage === 1) {
                newsSlider.classList.add('is-1-col');
            } else if (cardsPerPage === 2) {
                newsSlider.classList.add('is-2-col');
            }
        }

        function getPageOffset(pageIndex) {
            const firstCard = cards[0];
            if (!firstCard || !track) return 0;

            const trackStyles = window.getComputedStyle(track);
            const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0);

            const cardWidth = firstCard.getBoundingClientRect().width;

            return (cardWidth + gap) * cardsPerPage * pageIndex;
        }

        function applyTrackOffset(offset, animated = true) {
            if (!track) return;

            track.style.transition = animated ? "transform 0.45s ease" : "none";
            track.style.transform = `translateX(-${offset}px)`;
        }

        function buildDots() {
            if (!dotsContainer) return;

            dotsContainer.innerHTML = '';

            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'teidesat-news-slider__dot';
                dot.setAttribute('aria-label', `Ver grupo ${i + 1}`);
                dot.dataset.slide = String(i);

                dot.addEventListener('click', () => {
                    goToPage(i);
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsContainer) return;

            const dots = dotsContainer.querySelectorAll('.teidesat-news-slider__dot');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentPage);
            });
        }

        function goToPage(pageIndex) {
            const maxPage = Math.max(0, totalPages - 1);
            currentPage = Math.max(0, Math.min(pageIndex, maxPage));

            const pageOffset = getPageOffset(currentPage);

            applyTrackOffset(pageOffset, true);
            updateDots();
        }

        function updateNewsSlider() {
            if (!viewport || !track || !cards.length) return;

            cardsPerPage = getCardsPerPage();
            updateSliderClasses();

            totalPages = Math.ceil(cards.length / cardsPerPage);

            if (currentPage > totalPages - 1) {
                currentPage = totalPages - 1;
            }

            if (currentPage < 0) {
                currentPage = 0;
            }

            buildDots();

            requestAnimationFrame(() => {
                goToPage(currentPage);
            });
        }

        /*
        PC: mover el slider con la rueda del ratón
        */
        if (viewport && viewport.dataset.wheelBound !== "true") {
            viewport.addEventListener('wheel', (e) => {
                if (totalPages <= 1) return;

                if (Math.abs(e.deltaY) < 10) return;

                e.preventDefault();

                if (e.deltaY > 0) {
                    goToPage(currentPage + 1);
                } else {
                    goToPage(currentPage - 1);
                }
            }, { passive: false });

            viewport.dataset.wheelBound = "true";
        }

        /*
        MÓVIL: arrastrar lateralmente con el dedo
        */
        if (viewport && viewport.dataset.touchBound !== "true") {
            viewport.addEventListener("touchstart", (e) => {
                if (totalPages <= 1) return;

                const touch = e.touches[0];

                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                touchCurrentX = touch.clientX;

                isTouchingSlider = true;
                isHorizontalSwipe = false;
            }, { passive: true });

            viewport.addEventListener("touchmove", (e) => {
                if (!isTouchingSlider || totalPages <= 1) return;

                const touch = e.touches[0];

                touchCurrentX = touch.clientX;

                const deltaX = touchCurrentX - touchStartX;
                const deltaY = touch.clientY - touchStartY;

                /*
                Solo bloqueamos el scroll vertical si detectamos claramente
                que el usuario está arrastrando en horizontal.
                */
                if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
                    isHorizontalSwipe = true;
                    e.preventDefault();

                    const baseOffset = getPageOffset(currentPage);
                    const dragOffset = baseOffset - deltaX;

                    applyTrackOffset(Math.max(0, dragOffset), false);
                }
            }, { passive: false });

            viewport.addEventListener("touchend", () => {
                if (!isTouchingSlider || totalPages <= 1) return;

                const deltaX = touchCurrentX - touchStartX;
                const swipeThreshold = 45;

                isTouchingSlider = false;

                if (!isHorizontalSwipe) {
                    goToPage(currentPage);
                    return;
                }

                if (deltaX < -swipeThreshold) {
                    goToPage(currentPage + 1);
                } else if (deltaX > swipeThreshold) {
                    goToPage(currentPage - 1);
                } else {
                    goToPage(currentPage);
                }

                isHorizontalSwipe = false;
            }, { passive: true });

            viewport.addEventListener("touchcancel", () => {
                isTouchingSlider = false;
                isHorizontalSwipe = false;
                goToPage(currentPage);
            }, { passive: true });

            viewport.dataset.touchBound = "true";
        }

        let resizeTimeout;

        if (!window.__teidesatNewsResizeBound) {
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);

                resizeTimeout = setTimeout(() => {
                    updateNewsSlider();
                }, 120);
            });

            window.__teidesatNewsResizeBound = true;
        }

        updateNewsSlider();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeidesatPage);
} else {
    initTeidesatPage();
}