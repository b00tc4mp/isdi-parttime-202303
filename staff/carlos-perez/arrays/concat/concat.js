function push(array, ...elements){
    for(let element of elements){
     array[array.length]=element;
 }
     return array.length;
 }

 function concat(...arrays){
    let result=[];
    for(let array of arrays){
        for(let element of array){
            push(result,element);
        }
    }
    return result;
 }