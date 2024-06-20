function map(array, callback){
    const result = []
    for(const i in array){
        result[i]= callback(array[i])
    }
    return result
}

export default map