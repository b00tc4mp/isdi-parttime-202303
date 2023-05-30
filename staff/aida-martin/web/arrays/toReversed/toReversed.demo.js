import toReversed from "./toReversed.js";

const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = toReversed(items);
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]

console.log(toReversed([1, , 3])); // [3, undefined, 1]
console.log(toReversed([1, , 3, 4])); // [4, 3, undefined, 1]

// EXTRA:
console.log(toReversed([1, 2, 3, 4, 5, 6, 7, 8, 9])); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
