function slice(array, first, last) {
    let newArray = new Array()
    if (first === undefined) first = 1
    if (last === undefined) last = array.length
    for(let i = first; i < last ; i++) {
        newArray[newArray.length] = array[i]
    }
    return newArray
}