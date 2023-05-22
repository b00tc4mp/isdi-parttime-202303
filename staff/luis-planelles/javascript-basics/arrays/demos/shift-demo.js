//
const array1 = [1, 2, 3];

const firstElement = shift(array1);

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1

const myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

const shifted = shift(myFish);

console.log('myFish after:', myFish);
// myFish after: ['clown', 'mandarin', 'surgeon']

console.log('Removed this element:', shifted);
// Removed this element: angel

const names = ['Andrew', 'Tyrone', 'Paul', 'Maria', 'Gayatri'];

while (typeof (i = shift(names)) !== 'undefined') {
  console.log(i);
}
// Andrew, Tyrone, Paul, Maria, Gayatri
