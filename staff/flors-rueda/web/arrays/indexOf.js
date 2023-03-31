const indexOf = (array, item, start = 0) => {
    for(let i = start; i < array.length; i++){
        if(array[i] === item) return i;
    };
    return -1;
}