function push(array, ...elements) {
    for (let i = 0; i < elements.length; i++) {
        array[array.length] = elements[i]
    }   
    return array.length
}