function some(array, callback){
    for(const element of array){
        if(callback(element)){
            return true
        }
    }
}

export default some