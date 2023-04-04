import pop from "./pop.js"

const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(pop(plants));
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

pop(plants);

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]