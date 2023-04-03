function lastIndexOf(array, element) {
    for ( let i = array.length; i >= 0 ; --i){
        if (array[i] === element)
            return i
    }
    return -1
}