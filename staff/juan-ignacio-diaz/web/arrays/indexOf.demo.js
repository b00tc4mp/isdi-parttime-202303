import indexOf from "./indexOf.js"

var array = [2, 9, 9];
 
console.log(indexOf(array, 2))  // 0

console.log(indexOf(array,7))    // -1

console.log(indexOf(array,9, 2)) ;  // 2

console.log(indexOf(array,2, -1)) // -1

console.log(indexOf(array,2, -3)) // 0