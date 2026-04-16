function initTeidesatPage() {
    console.log("TEIDESAT JS cargado");

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
       BOTÓN VOLVER ARRIBA
    ========================================================= */

       const backTop = document.getElementById("teidesat-backtop");

    if (backTop && backTop.dataset.bound !== "true") {
        backTop.addEventListener("click", function (e) {
            e.preventDefault();

            const scrollTarget = document.scrollingElement || document.documentElement || document.body;

            scrollTarget.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });

        backTop.dataset.bound = "true";
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
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeidesatPage);
} else {
    initTeidesatPage();
}