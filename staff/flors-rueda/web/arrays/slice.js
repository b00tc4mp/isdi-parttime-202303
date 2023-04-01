const slice = (array, start = undefined, end = undefined) => {
    if(!start && !end){
        return array;
    };
    let shallowCopy = new Array;
    if(!end){
        end = array.length;
    };
    if(start < 0) start = array.length + start;
    if(end < 0) end = array.length + end;
    let index = 0;
    for(let i = start; i < end; i++){
        shallowCopy[index] = array[i];
        index += 1;
    };
    return shallowCopy;
};

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(slice(animals, 2));
// Expected output: Array ["camel", "duck", "elephant"] elimina los indices (0) (1)

console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"] elimina los indices (1) (2) (4)

console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"] elimina los indices (1) (5)

console.log(slice(animals, -2));
// Expected output: Array ["duck", "elephant"] elimina los indices (length-2) y -1 y 0

console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]