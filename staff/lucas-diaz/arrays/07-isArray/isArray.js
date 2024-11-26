function isArray(elemento) {
    if (typeof elemento === "undefined") return false
    if (elemento === null) return false
    return elemento && typeof elemento === 'object' && typeof elemento.length === 'number';
}