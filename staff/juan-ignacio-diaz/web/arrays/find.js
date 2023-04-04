function find (array, callback) {
    for(let element of array) {
        if (callback(element)) 
            return element
    }
    return undefined
}

export default find