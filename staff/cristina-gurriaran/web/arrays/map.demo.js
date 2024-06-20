function map (array, callback){
    const newArray = []
    for(let i = 0; i < array.length; i++){
        newArray[newArray.length] = callback(array[i])
    }
    return newArray
}

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = map(array1, (x => x * 2))

console.log(map1);
// Expected output: Array [2, 8, 18, 32]