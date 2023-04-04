function filter(array, callback){
    let result = []
    for(const element of array){
        if(callback(element))
            result.push(element)
    }
    return result
}

export default filter