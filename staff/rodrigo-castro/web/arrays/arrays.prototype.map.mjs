function map(array, callback){
    const result = []
    for(const element of array){
        result.push(callback(element))
    }
    return result
}

export default map