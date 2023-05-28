import at from './at.mjs'


const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`Using an index of ${index} the item returned is ${at(array1, index)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${at(array1, index)}`);
// Expected output: "Using an index of -2 item returned is 130"

// añadimos elemento al array u solicitamos el ultimo elemento
array1.push(120)
console.log(at(array1, -1))
//expected output: 120