export const toReversed = (array) => {
    let reversedArray = []
    let index = 0
    for(let i = array.length - 1; i >= 0; i--){
        reversedArray[array.length - 1 - i] = array[i];
    };
  return reversedArray;
};