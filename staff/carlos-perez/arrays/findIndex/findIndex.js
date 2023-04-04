function findIndex(array, callback){
    for(let i in array){
        if(callback(array[i])){
            return i;
        }
    }
    return -1;
}