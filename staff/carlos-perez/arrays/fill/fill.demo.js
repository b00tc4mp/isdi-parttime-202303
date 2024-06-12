const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
fill(array1,0,2,4);
console.log(array1);
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
fill(array1,5,1);
console.log(array1);
// Expected output: Array [1, 5, 5, 5]

fill(array1,6);
console.log(array1);
// Expected output: Array [6, 6, 6, 6]

fill(array1,0,-3,-1);
console.log(array1);
// Expected output: Array [6, 0, 0, 6]