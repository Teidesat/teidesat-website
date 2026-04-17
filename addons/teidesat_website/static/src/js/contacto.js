function initTeidesatContactoForm() {
    const asuntoSelect = document.getElementById("asunto");
    const asuntoLibreRow = document.getElementById("teidesat-asunto-libre-row");
    const asuntoLibreInput = document.getElementById("asunto_libre");

    if (!asuntoSelect || !asuntoLibreRow || !asuntoLibreInput) {
        return;
    }

    function updateAsuntoLibreVisibility() {
        const isOtro = asuntoSelect.value === "Otro";

        asuntoLibreRow.classList.toggle("teidesat-form-row--visible", isOtro);

        if (isOtro) {
            asuntoLibreInput.setAttribute("required", "required");
        } else {
            asuntoLibreInput.removeAttribute("required");
            asuntoLibreInput.value = "";
        }
    }

    asuntoSelect.addEventListener("change", updateAsuntoLibreVisibility);
    updateAsuntoLibreVisibility();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTeidesatContactoForm);
} else {
    initTeidesatContactoForm();
}