const array2 = ['one', 'two', 'three'];
console.log('array2:', array2);
// Expected output: "array1:" Array ["one", "two", "three"]

const reverse = (array) => {
    let inverted = []
    for(let i = 0; i < array.length; i++){
        inverted[array.length-1-i] = array[i]
    }
    for(let i = 0; i < array.length; i++){
        array[i] = inverted[i]
    }
    return array
}

const reversed2 = reverse(array2);
console.log('reversed2:', reversed2);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array2:', array2);
// Expected output: "array1:" Array ["three", "two", "one"]
