const beasts = ["ant", "bison", "camel", "duck", "bison"];

console.log(indexOf(beasts, "bison"));
// Expected output: 1

// Start from index 2
console.log(indexOf(beasts, "bison", 2));
// Expected output: 4

console.log(indexOf(beasts, "giraffe"));
// Expected output: -1

console.log(indexOf(beasts, "camel", -3));
// Expected output: 2
