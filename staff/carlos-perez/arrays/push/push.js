function push(array, ...elements){
   for(let element of elements){
    array[array.length]=element;
}
    return array.length;
}
