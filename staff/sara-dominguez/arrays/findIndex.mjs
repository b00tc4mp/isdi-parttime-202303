function findIndex(array, callback) {
    for(let i = 0; i <array.length; i++) {
        const element = array[i]
        if(callback(element)){
            return i
        }
    }
}

export default findIndex