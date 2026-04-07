document.addEventListener("DOMContentLoaded", () => {
    const orbital = document.getElementById("departments-orbital");
    const toggle = document.getElementById("departments-star-toggle");

    if (!orbital || !toggle) return;

    const slots = [
        document.getElementById("dept-slot-0"),
        document.getElementById("dept-slot-1"),
        document.getElementById("dept-slot-2"),
        document.getElementById("dept-slot-3"),
    ];

    const departmentGroups = [
        [
            {
                label: "ADS",
                href: "/departamentos/ads",
                img: "/teidesat_website/static/src/img/Pegatina_ADSC.png",
                alt: "Departamento ADS",
            },
            {
                label: "Arte",
                href: "/departamentos/arte",
                img: "/teidesat_website/static/src/img/Pegatina_Arte.png",
                alt: "Departamento Arte",
            },
            {
                label: "Divulgación",
                href: "/departamentos/divulgacion",
                img: "/teidesat_website/static/src/img/Pegatina_Divulgacion.png",
                alt: "Departamento Divulgación",
            },
            {
                label: "Electrocom",
                href: "/departamentos/electrocom",
                img: "/teidesat_website/static/src/img/Pegatina_Electrocom.png",
                alt: "Departamento Electrocom",
            },
        ],
        [
            {
                label: "IT",
                href: "/departamentos/it",
                img: "/teidesat_website/static/src/img/Pegatina_IT.png",
                alt: "Departamento IT",
            },
            {
                label: "Mecánica",
                href: "/departamentos/mecanica",
                img: "/teidesat_website/static/src/img/Pegatina_Mecanica.png",
                alt: "Departamento Mecánica",
            },
            {
                label: "R&D",
                href: "/departamentos/rd",
                img: "/teidesat_website/static/src/img/Pegatina_R&D.png",
                alt: "Departamento R&D",
            },
            {
                label: "Administración",
                href: "/departamentos/administracion",
                img: "/teidesat_website/static/src/img/Pegatina_Administracion.png",
                alt: "Departamento Administración",
            },
        ],
    ];

    let currentGroup = 0;

    function paintGroup(groupIndex) {
        const group = departmentGroups[groupIndex];

        slots.forEach((slot, index) => {
            const item = group[index];
            if (!slot || !item) return;

            const img = slot.querySelector(".department-orbit-card__image");
            const label = slot.querySelector(".department-orbit-card__label");

            slot.setAttribute("href", item.href);
            if (img) {
                img.setAttribute("src", item.img);
                img.setAttribute("alt", item.alt);
            }
            if (label) {
                label.textContent = item.label;
            }
        });
    }

    function changeGroup() {
        slots.forEach(slot => slot.classList.add("is-changing"));
        toggle.classList.add("is-spinning");

        window.setTimeout(() => {
            currentGroup = (currentGroup + 1) % departmentGroups.length;
            paintGroup(currentGroup);
        }, 220);

        window.setTimeout(() => {
            slots.forEach(slot => slot.classList.remove("is-changing"));
            toggle.classList.remove("is-spinning");
        }, 520);
    }

    paintGroup(currentGroup);
    toggle.addEventListener("click", changeGroup);
});