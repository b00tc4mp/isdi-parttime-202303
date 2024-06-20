function forEach(array, callback) {
    for(const i in array){
        callback(array[i])
    }
}

export default forEach