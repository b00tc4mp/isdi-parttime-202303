let array0 = [1, 2, 3]


console.log(fill(array0, 4))    // [4, 4, 4]

let  array1 = [1, 2, 3]
console.log(fill(array1,4, 1))       // [1, 4, 4]

let  array2 = [1, 2, 3]
console.log(fill(array2,4, 1, 2))    // [1, 4, 3]

let  array3 = [1, 2, 3]
console.log(fill(array3, 4, 1, 1))    // [1, 2, 3]

let  array4 = [1, 2, 3]
console.log(fill(array4, 4, 3, 3))    // [1, 2, 3]

let  array5 = [1, 2, 3]
console.log(fill(array5, 4, -3, -2))   // [4, 2, 3]

let  array6 = [1, 2, 3]
console.log(fill(array6, 4, 3, 5)) // [1, 2, 3]

let  array7 = [1, 2, 3]
console.log(fill(array7, 4, -2))    // [1, 4, 4]

let  array8 = [1, 2, 3]
console.log(fill(array8,4, NaN, NaN)) // [1, 2, 3]

let  array9 = [1, 2, 3]
console.log(fill(array9,4, 1, NaN)) // [1, 4, 4]

let  array10 = [1, 2, 3]
console.log(fill(array10,4, NaN, 2)) // [1, 2, 3]
