function initTeidesatPage() {
    console.log("TEIDESAT JS cargado");

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

    const system = document.querySelector(".teidesat-objectives-system");
    const nodes = document.querySelectorAll(".objective-node");
    const panels = document.querySelectorAll(".objective-panel");
    const toggleAllButton = document.getElementById("objectives-toggle-all");

    if (!system || !nodes.length) return;

    function setObjectiveState(target, isActive) {
        const node = system.querySelector(`.objective-node[data-target="${target}"]`);
        const panel = document.querySelector(`.objective-panel[data-panel="${target}"]`);

        if (node) node.classList.toggle("active", isActive);
        if (panel) panel.classList.toggle("active", isActive);
    }

    function areAllOpen() {
        return Array.from(nodes).every((node) => node.classList.contains("active"));
    }

    nodes.forEach((node) => {
        if (node.dataset.bound === "true") return;

        node.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            const nextState = !this.classList.contains("active");
            setObjectiveState(target, nextState);
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
        });

        toggleAllButton.dataset.bound = "true";
    }

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

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeidesatPage);
} else {
    initTeidesatPage();
}