function some(array, callback, thisArg){
if(array.length===0){
    return false;
}

for(let element in array){
    if(callback(element)){
        return true;
    }
    else{
        return false;
    }
}
}