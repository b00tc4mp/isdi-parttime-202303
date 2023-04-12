import filter from "./filter.js"
const words = ['spray', 'exuberant', 'limit', 'elite', 'destruction', 'present'];

const result = filter(words, word => word.length > 6);

console.log(result);
console.log(words.filter(word => word.length > 6))
// Expected output: Array ["exuberant", "destruction", "present"]