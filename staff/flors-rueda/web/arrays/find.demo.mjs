import { find } from "./find.mjs";

const array1 = [5, 12, 8, 130, 44];

const found = find(array1, element => element > 10);

console.log(found);
// Expected output: 12
