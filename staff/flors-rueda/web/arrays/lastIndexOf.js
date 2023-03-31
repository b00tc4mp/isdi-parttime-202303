const lastIndexOf = (array, item, start = 0) => {
    start <= 0 ? i = array.length - 1 : i = start;
    for(i; i >= 0; i--){
        if(array[i] === item) return i;
    };
    return -1;
}