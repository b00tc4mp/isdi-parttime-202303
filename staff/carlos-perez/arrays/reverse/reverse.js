function reverse(array){
    let result=[];
    for(let i=array.length-1; i>=0; i--){
        result[result.length]=array[i];
    }
    array.length=0;
    for(let element of result){
        array[array.length]=element;
    }
    return array;
}