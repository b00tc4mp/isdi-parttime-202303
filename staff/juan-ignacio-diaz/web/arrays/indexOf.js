function indexOf(array, element, ini) {
    if (ini === undefined) ini = 0
    if (ini < 0) 
        ini = array.length + ini

    for ( let i = ini; i < array.length; i++){
        if (array[i] === element)
            return i
    }
    return -1
}