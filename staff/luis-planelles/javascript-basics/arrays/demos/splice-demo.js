console.warn('months');

const months = ['Jan', 'March', 'April', 'June'];
splice(months, 1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

console.warn('months2');

const months2 = ['Jan', 'Feb', 'March', 'April', 'June'];

const result = splice(months2, 4, 1, 'May');

// Replaces 1 element at index 4
console.log(months2);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
console.log(result);
// removed is ["june"]

console.warn('MyFish');

const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
const removed = splice(myFish, 2, 0, 'drum');

console.log(myFish);
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
console.log(removed);
// removed is [], no elements removed

console.warn('MyFish1');

const myFish1 = ['angel', 'clown', 'mandarin', 'sturgeon'];
const removed1 = splice(myFish1, 2, 0, 'drum', 'guitar');

console.log(myFish1);
// myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
console.log(removed1);
// removed is [], no elements removed

console.warn('MyFish3');
const myFish3 = ['angel', 'clown', 'drum', 'sturgeon'];
const removed3 = splice(myFish3, 2, 1, 'trumpet');

console.log(myFish3);
// myFish is ["angel", "clown", "trumpet", "sturgeon"]
console.log(removed3);
// removed is ["drum"]

console.warn('MyFish4');
const myFish4 = ['angel', 'clown', 'trumpet', 'sturgeon'];
const removed4 = splice(myFish4, 0, 2, 'parrot', 'anemone', 'blue');

console.log(myFish4);
// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
console.log(removed4);
// removed is ["angel", "clown"]

console.warn('MyFish2');
const myFish2 = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
const removed2 = splice(myFish2, 3, 1);

console.log(myFish2);
// myFish is ["angel", "clown", "drum", "sturgeon"]
console.log(removed2);
// removed is ["mandarin"]

console.warn('MyFish5');
const myFish5 = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
const removed5 = splice(myFish5, 2, 2);

console.log(myFish5);
// myFish is ["parrot", "anemone", "sturgeon"]
console.log(removed5);
// removed is ["blue", "trumpet"]

console.warn('myFish6');
const myFish6 = ['angel', 'clown', 'mandarin', 'sturgeon'];
const removed6 = splice(myFish6, -2, 1);

console.log(myFish6);
// myFish is ["angel", "clown", "sturgeon"]
console.log(removed6);
// removed is ["mandarin"]

console.warn('myFish7');
const myFish7 = ['angel', 'clown', 'mandarin', 'sturgeon'];
const removed7 = splice(myFish7, 2);

console.log(myFish7);
// myFish is ["angel", "clown"]
console.log(removed7);
// removed is ["mandarin", "sturgeon"]

console.warn('arr');
const arr = [1, , 3, 4, , 6];
console.log(splice(arr, 1, 2)); // [empty, 3]
console.log(arr); // [1, 4, empty, 6]
