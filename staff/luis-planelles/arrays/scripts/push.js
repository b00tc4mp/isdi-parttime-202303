let animals = ["pigs", "goats", "sheep"];

const push = (array, pushItem) => {
  array[array.length] = pushItem;
  return array.length;
};

const count = push(animals, "cows");
console.log(count);
// Expected output: 4

console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

push(animals, "chickens", "cats", "dogs");
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
