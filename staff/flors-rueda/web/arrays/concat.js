const concat = (array1, array2) => {
    for(item of array2){
        array1[array1.length] = item;
    };
    return array1;
};