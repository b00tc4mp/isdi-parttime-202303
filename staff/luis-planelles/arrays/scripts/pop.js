//
const pop = (array) => {
  const lastItem = array[array.length - 1];
  array.length--;

  return lastItem;
};

const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
