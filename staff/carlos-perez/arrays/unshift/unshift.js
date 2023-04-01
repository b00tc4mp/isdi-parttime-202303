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

 function unshift(array,...elements){
    let result= concat(elements,array);
    array.length=0;
    for(let i=0; i<result.length; i++){
        push(array,result[i]);
    }
    return array.length;
 }