function toReversed(array){
    const result = [];
    for(let i = array.length-1; i>=0; i--){
        if(array[i]==''){
            result[result.length]= undefined;
        }
        result[result.length]=array[i];
    }
    return result;
}