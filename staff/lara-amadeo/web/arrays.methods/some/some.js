function some(array, callback){
    for(const element of array){

        if(callback(element)) 
        return true
    } return false
}

export default some