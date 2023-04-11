import { toReversed } from './toReversed.mjs';


const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = toReversed(items);
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]