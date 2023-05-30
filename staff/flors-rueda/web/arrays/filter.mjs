export const filter = (array, callback) => {
    let output = []
    for(const element of array) {
      if(callback(element)) output[output.length] = element;
    }
    return output
}