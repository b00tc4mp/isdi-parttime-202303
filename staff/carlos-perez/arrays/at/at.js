function at(array, index){
    if(index>=0 && index<array.length){
        return array[index];
    }
    else if(index<0 && index>(-array.length)){
        return array[array.length+index];
    }
    else{
        throw new Error("Índice fuera de rango");
    }
}
