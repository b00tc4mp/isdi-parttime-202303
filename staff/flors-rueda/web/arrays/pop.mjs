export const pop = (array) => {
    const lastItem = array[array.length - 1];
    array.length = array.length - 1;
    return lastItem;
}