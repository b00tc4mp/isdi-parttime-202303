function filter(array, callback){
    let result = []
    for(const i in array){
        if(callback(array[i]))
            result.push(array[i])
    }
    return result
}

export default filter