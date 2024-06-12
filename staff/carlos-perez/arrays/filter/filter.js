function filter(array, callback){
    let result=[];
    for(const element of array){
        if(callback(element)){
            result[result.length]=element;
        }
    }
    return result;
}
