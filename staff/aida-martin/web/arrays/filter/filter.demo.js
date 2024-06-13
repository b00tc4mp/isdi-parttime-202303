import filter from "./filter.js";

const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

const result = filter(words, (word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
