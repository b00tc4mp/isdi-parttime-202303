const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(lastIndexOf(animals,'Dodo',3));
// Expected output: 3
console.log(lastIndexOf(animals,'Tiger'));
// Expected output: 1


var array = [2, 5, 9, 2];

console.log(lastIndexOf(array,2)); // 3


console.log(lastIndexOf(array,7)); // -1


console.log(lastIndexOf(array, 2, 3)) // 3


console.log(lastIndexOf(array, 2, 2))  // 0


console.log(lastIndexOf(array, 2, -2))  // 0


console.log(lastIndexOf(array, 2, -1))  // 3