import includes from './includes.2.mjs'

const array1 = [1, 2, 3];

console.log('caso 1 --includes')
console.log(includes(array1, 2));
// Expected output: true

const pets = ['cat', 'dog', 'bat', 'scorpion'];

console.log(includes(pets, 'cat'));
// Expected output: true

console.log(includes(pets, 'at'));
// Expected output: false

console.log('caso 2 --includes, con parametro de inicio')

console.log(includes(pets, 'dog', 1));
// Expected output: true

console.log(includes(pets, 'bat', -3))
// Expected output: true

console.log(includes(pets, 'bat', -1))
// Expected output: false