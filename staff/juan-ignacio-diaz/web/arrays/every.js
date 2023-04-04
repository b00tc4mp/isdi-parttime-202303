function every (array, callback) {
    for(let element of array) {
        if (!callback(element)) 
            return false
    }
    return true
}

export default every