function every(array, callback){    
    const reference = [1, , 1]
    for(const element of array){
        if(element === reference[1])
            continue

        if(!callback(element))
            return false
    }
    return true
}

export default every