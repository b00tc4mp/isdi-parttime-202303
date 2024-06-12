function map(array, callback){
    let result=[];
    for(const element of array){
        result[result.length]=callback(element);
    }
    return result;
}
