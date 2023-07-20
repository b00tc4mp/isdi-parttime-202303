const beasts = ["ant", "bison", "camel", "duck", "bison"];

console.log(indexOf(beasts, "bison"));
// Expected output: 1

// Start from index 2
console.log(indexOf(beasts, "bison", 2));
// Expected output: 4

// Start from index 3
console.log(indexOf(beasts, "bison", 3));
// Expected output: 4

// Start from index 99
console.log(indexOf(beasts, "bison", 99));
// Expected output: -1

// Start from index -2
console.log(indexOf(beasts, "bison", -2));
// Expected output: 4

// Start from index -3
console.log(indexOf(beasts, "bison", -3));
// Expected output: 4

// Start from index -4
console.log(indexOf(beasts, "bison", -4));
// Expected output: 1

// Start from index -88
console.log(indexOf(beasts, "bison", -88));
// Expected output: 1

// Start from index -2
console.log(indexOf(beasts, "camel", -2));
// Expected output: -1

console.log(indexOf(beasts, "giraffe"));
// Expected output: -1
