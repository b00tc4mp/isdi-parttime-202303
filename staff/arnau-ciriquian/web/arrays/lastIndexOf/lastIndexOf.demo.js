const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(lastIndexOf(animals, 'Dodo'));
// Expected output: 3

console.log(lastIndexOf(animals, 'Tiger'));
// Expected output: 1

console.log(lastIndexOf(animals, 'Penguin', -2));
// Expected output: 2

console.log(lastIndexOf(animals, 'Tiger', -5));
// Expected output: -1

console.log(lastIndexOf(animals, 'Tiger', 10));
// Expected output: 1