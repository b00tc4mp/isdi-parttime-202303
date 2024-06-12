function shift(array) {
    if(array.length===0){
        throw new Error("Array vacío");
    }
    let retorno=array[0];
    for(let i=1; i<array.length; i++){
        array[i-1]=array[i];
    }
    array.length--;
    return retorno;
  }