const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum');
console.log('1. myFish:', myFish, 'removed:', removed);

// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed

var removed = myFish.splice(3, 1);
console.log('2. myFish:', myFish, 'removed:', removed);

// removed is ["mandarin"]
// myFish is ["angel", "clown", "drum", "sturgeon"]

var removed = myFish.splice(2, 1, 'trumpet');
console.log('3. myFish:', myFish, 'removed:', removed);

// myFish is ["angel", "clown", "trumpet", "sturgeon"]
// removed is ["drum"]

var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
console.log('4. myFish:', myFish, 'removed:', removed);

// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// removed is ["angel", "clown"]