function join(array,separator){
    let result='';
    if(separator===undefined){
        separator=',';
    }
    for(let i=0; i<array.length;i++){
        result+=array[i].toString();
        if(i!==array.length-1){
            result+=separator.toString();
        }
    }
    return result;
}