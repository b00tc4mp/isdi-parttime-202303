function includes(array, element) {
    for (let item of array){
        if (item === element)
            return true
    }
    return false
}