const shift = (array) => {
    const firstElement = array[0];
    const originalArray = [...array];
    array.length = array.length - 1;
    let index = 0;
    for(let i = 1; i < originalArray.length; i++){
        array[index] = originalArray[i];
      	index += 1;
    };
    return firstElement;
};
