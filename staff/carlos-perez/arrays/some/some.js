function some(array, callback, thisArg){
if(array.length===0){
    return false;
}

for(const element of array){
    if(callback(element)){
        return true;
    }
    else{
        return false;
    }
}
}
