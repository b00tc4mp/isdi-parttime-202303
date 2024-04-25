export const map = (array, callback) => {
    let output = [];
    for(const element of array) output[output.length] = callback(element);
    return output
}