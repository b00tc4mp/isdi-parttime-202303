import { lastIndexOf } from "./lastIndexOf.mjs";

const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(lastIndexOf(animals, 'Dodo'));
// Expected output: 3

console.log(lastIndexOf(animals, 'Tiger'));
// Expected output: 1

console.log(lastIndexOf(animals, 'Dodo', 2));
// Expected output: 0

console.log(lastIndexOf(animals, 'Cat'));
// Expected output: -1