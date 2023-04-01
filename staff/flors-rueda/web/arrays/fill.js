const fill = (array, filler, start = 0, end = array.length) => {
    for(let i = start; i < end; i++){
        array[i] = filler
    };
    return array
}