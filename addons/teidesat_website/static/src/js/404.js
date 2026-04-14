/** @odoo-module **/
(function () {
    'use strict';

    function initStarsField() {
        var field = document.getElementById('hs-stars-field');
        if (!field) return;

        for (var i = 0; i < 120; i++) {
            var s = document.createElement('span');
            s.className = 'hs-star';
            var size = Math.random() * 2.5 + 0.5;
            s.style.cssText = [
                'width:'   + size + 'px',
                'height:'  + size + 'px',
                'top:'     + Math.random() * 100 + '%',
                'left:'    + Math.random() * 100 + '%',
                '--dur:'   + (Math.random() * 4 + 2) + 's',
                '--delay:-' + (Math.random() * 5) + 's'
            ].join(';');
            field.appendChild(s);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStarsField);
    } else {
        initStarsField();
    }
})();