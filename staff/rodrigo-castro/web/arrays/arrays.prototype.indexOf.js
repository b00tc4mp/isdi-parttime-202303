const beasts2 = ['ant', 'bison', 'camel', 'duck', 'bison'];

const indexOf = (array, element, start = 0) => {
    for(let i = start; i < array.length; i++){
        if(array[i] === element){
            return i
        }
    }
    return -1
}

console.log(indexOf(beasts2, 'bison'));
// Expected output: 1

// Start from index 2
console.log(indexOf(beasts2, 'bison', 2));
// Expected output: 4

console.log(indexOf(beasts2, 'giraffe'));
// Expected output: -1
