export const push = (array, element) => {
    array[array.length] = element;
    return array.length;
}