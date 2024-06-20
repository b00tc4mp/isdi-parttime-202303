function toReversed(items) {
    const result = []
    for(let i = 0; i < items.length; i++) {
        result[i] = items[items.length-1-i]
    }

    return result
}

const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = toReversed(items);
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]

console.log([1, , 3].toReversed()); // [3, undefined, 1]
console.log([1, , 3, 4].toReversed()); // [4, 3, undefined, 1]

console.log('** MY FUNCTION **')
console.log(toReversed([1, , 3])); // [3, undefined, 1]
console.log(toReversed([1, , 3, 4])); // [4, 3, undefined, 1]

console.log('** OBJECT **')

const arrayLike = {
    length: 3,
    unrelated: "foo",
    2: 4,
  };
  console.log(Array.prototype.toReversed.call(arrayLike));
  // [4, undefined, undefined]
  // The '0' and '1' indices are not present so they become undefined

  console.log('** OBJECT MY FUNCTION **')
  console.log(toReversed(arrayLike))