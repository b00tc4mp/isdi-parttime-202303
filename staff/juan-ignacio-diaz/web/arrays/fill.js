function fill(array, element, first, last) {
    if (first === undefined) first = 0
    if (last === undefined) last = array.length
    for(let i = first; i<last ; i++) {
        array[i] = element
    }
    return array
}

export default fill