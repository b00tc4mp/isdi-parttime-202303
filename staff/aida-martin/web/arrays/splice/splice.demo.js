import splice from "./splice.js";

const months = ["Jan", "March", "April", "June"];
console.log(splice(months, 1, 0, "Feb"));
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

const nums = [1, 2, 3, 5, 6];
console.log(splice(nums, 3, 0, 4));
// Expected output: []
console.log(nums);
// Expected output: [1, 2, 3, 4, 5, 6]

const months2 = ["Jan", "Feb", "March", "April", "June"];
console.log(splice(months2, 4, 1, "May"));
// Replaces 1 element at index 4
console.log(months2);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

const nums2 = [1, 2, 10, 4, 5];

console.log(splice(nums2, 2, 1, 3));
// Expected output: [10]

console.log(nums2);
// Expected output: [1, 2, 3, 4, 5]

const months3 = ["Jan", "Feb", "March", "April", "June", "July"];

console.log(splice(months3, 2, 2, "X"));
// Expected output: ['March', 'April']

console.log(months3);
// Expected output: Array ['Jan', 'Feb', 'X', 'June', 'July']

//TODO: Make this case work!

const months6 = ["Jan", "Feb", "March", "April", "June", "July", "August"];
console.log(splice(months6, 2, 4, "X", "Y"));
// Expected output: ['March', 'April', 'June', 'July']
console.log(months6);
// Expected output: Array ['Jan', 'Feb', 'X', 'Y', 'August']

//EXTRA:
const months7 = [
  "Jan",
  "Feb",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

console.log(splice(months7, 3, 5, "X", "Y", "Z"));
// Expected output: Array ['April', 'June', 'July', 'August', 'September']

console.log(months7);
// Expected output: Array ['Jan', 'Feb', 'March', 'X', 'Y', 'Z', 'October', 'November', 'December']
