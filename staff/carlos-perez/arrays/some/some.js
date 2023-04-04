function some(array, callback){
if(array.length===0){
    return false;
}

for(const element of array){
    if(callback(element)){
        return true;
    }
}
return false;
}
