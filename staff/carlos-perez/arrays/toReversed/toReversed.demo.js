const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = toReversed(items);
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]

const items2 = [1, , 3];
console.log(items2); // [1, , 3]

const reversedItems2 = toReversed(items2);
console.log(reversedItems2); // [3, undefined, 1]
console.log(items2); // [1, , 3]