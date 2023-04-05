export const unshift = (array, ...elements) => {
    for(let i = array.length - 1; i >= 0; i--) {
        array[i + elements.length] = array[i];
    }
    for(let i = 0; i < elements.length; i++) {
        array[i] = elements[i];
    }
    return array.length;
};