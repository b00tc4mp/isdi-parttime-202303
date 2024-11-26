

//                        -->
//          -7 -6 -5 -4  -3 -2 -1                             
//           0  1  2  3   4  5  6   
var array = [2, 9, 9, 12, 8, 4, 10]; // length --> 7 


console.log(indexOf(array,2));   // 0
console.log(indexOf(array,7));    // -1
console.log(indexOf(array, 9, 2));   // 2
console.log(indexOf(array, 2, -1));  // -1
console.log(indexOf(array, 2, -3));  // 0
