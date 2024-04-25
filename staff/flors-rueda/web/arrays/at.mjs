export const at = (array, index) => {
    if(index < 0) index = array.length + index;
    return array[index];
}