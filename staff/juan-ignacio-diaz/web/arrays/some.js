function some (array, callback) {
    for(let element of array) {
        if (callback(element)) 
            return true
    }
    return false
}

export default some