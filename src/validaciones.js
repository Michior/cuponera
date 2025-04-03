export function validarVacíos(element) {
    if (!element.trim()) {
        return "El campo no puede estar vacío.";
    }
    return "";
}

export function verificarNumeros(element) {
    if (!/^\d+$/.test(element.trim())) {
        return "El campo debe contener solo números.";
    }
    return "";
}

export function verificarFechaExpiracion(fechaExp) {
    if (!fechaExp) return "La fecha de expiración es obligatoria.";
    const [year, month] = fechaExp.split("-").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || year > 2100) {
        return "El año de expiración no es válido.";
    }
    if (year === currentYear && month < currentMonth) {
        return "La tarjeta ya ha vencido.";
    }
    return "";
}
