const reverse = (array) => {
    const originalArray = [...array]
    let index = 0
    for(let i = originalArray.length - 1; i >= 0; i--){
        array[index] = originalArray[i];
        index += 1;
    };
  return array;
};