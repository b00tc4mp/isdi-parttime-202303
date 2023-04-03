function pop(array) {
    const element = array[array.length-1]
    array.length--
    return element
}