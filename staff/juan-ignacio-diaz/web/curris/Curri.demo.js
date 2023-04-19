import Curri from './Curri.js'



////////////////////
console.log("push")
const animals = new Curri

const count = animals.push('cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: Array ["cows"]

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: Array ["cows", "chickens", "cats", "dogs"]


////////////////////
console.log("at")

const c = new Curri

c.push('A', 'B', 'C')

let index = 2;

console.log(`Using an index of ${index} the item returned is ${c.at(index)}`);
// Expected output: "Using an index of 2 the item returned is B"

index = -2;

console.log(`Using an index of ${index} item returned is ${c.at(index)}`);
// Expected output: "Using an index of -2 item returned is A"



////////////////////
console.log("concat")

const c2 = new Curri
c2.push('d', 'e', 'f')

const c3 = c.concat(c2);

console.log(c3);
// Expected output: Array ["A", "B", "C", "d", "e", "f"]


////////////////////
console.log("every")
const isBelowThreshold = (currentValue) => currentValue < 40;

const a1 = new Curri
a1.push(1, 30, 39, 29, 10, 13)
const a2 = new Curri
a2.push(1, 30, 39, 50, 10, 13)

console.log(a1.every(isBelowThreshold));
// Expected output: true

console.log(a2.every(isBelowThreshold));
// Expected output: false


/////////////////////////////
console.log("fill")

const afill1 = new Curri
afill1.push(1, 2, 3, 4)


console.log(afill1.fill(0, 2, 4))
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(afill1.fill(5, 1))
// Expected output: Array [1, 5, 5, 5]

console.log(afill1.fill(6))
// Expected output: Array [6, 6, 6, 6]

/////////////////////////////
console.log("forEach")
const cfe = new Curri

cfe.push('A', 'B', 'C')
cfe.forEach(elem => console.log(elem))


/*
const cf2 = c.map(elem => elem.toLowerCase())
cf2.forEach(elem => console.log(elem))
*/
