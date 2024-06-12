let array = [1, 2, 3]


console.log(array.fill(4))           // [4, 4, 4]
console.log(array.fill(4, 1))       // [1, 4, 4]
console.log(array.fill(4, 1, 2))    // [1, 4, 3]
console.log(array.fill(4, 1, 1))    // [1, 2, 3]
console.log(array.fill(4, 3, 3))    // [1, 2, 3]
console.log(array.fill(4, -3, -2))   // [4, 2, 3]
console.log(array.fill(4, NaN, NaN)) // [1, 2, 3]
console.log(array.fill(4, 3, 5))     // [1, 2, 3]

console.log(array.fill(4, -2))    // [1, 4, 4]
