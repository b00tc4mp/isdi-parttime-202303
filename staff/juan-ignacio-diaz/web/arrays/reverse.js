function reverse(array) {
    for (let i = 0; i < array.length/2; i++) {
        const tmpElement = array[i]
        array[i] =  array[array.length-i-1]
        array[array.length-i-1] = tmpElement
    }
    return array
}

export default reverse