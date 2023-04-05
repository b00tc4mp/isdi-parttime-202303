import { splice } from './splice.mjs'

const months = ['Jan', 'March', 'April', 'June'];

splice(months, 1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

splice(months, 4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]


var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = splice(myFish, 2, 0, 'drum');
console.log('1. myFish:', myFish, 'removed:', removed);
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed

var removed = splice(myFish, 2, 1, 'trumpet');
console.log('3. myFish:', myFish, 'removed:', removed);
// myFish is ["angel", "clown", "trumpet", "sturgeon"]
// removed is ["drum"]

var removed = splice(myFish, 0, 2, 'parrot', 'anemone', 'blue');
console.log('4. myFish:', myFish, 'removed:', removed);
// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// removed is ["angel", "clown"]

var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = splice(myFish, myFish.length - 3, 2);

console.log('5. myFish:', myFish, 'removed:', removed);
// myFish is ["parrot", "anemone", "sturgeon"]
// removed is ["blue", "trumpet"]

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(-2, 1);

console.log('6. myFish:', myFish, 'removed:', removed);
// myFish is ["angel", "clown", "sturgeon"]
// removed is ["mandarin"]

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

console.log('7. myFish:', myFish, 'removed:', removed);
// myFish is ["angel", "clown"]
// removed is ["mandarin", "sturgeon"]