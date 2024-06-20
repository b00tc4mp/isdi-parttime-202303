function push(array, element){

    array[array.length] = element
    return array.length
}

const animals = ['pigs', 'goats', 'sheep'];

const count = push(animals,'cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

