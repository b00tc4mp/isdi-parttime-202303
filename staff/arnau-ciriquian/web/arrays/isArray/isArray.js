function isArray(array) {
    if (array && array.length && typeof array === 'object' && !array.byteLength ) {
        return true
    }
    return false
}