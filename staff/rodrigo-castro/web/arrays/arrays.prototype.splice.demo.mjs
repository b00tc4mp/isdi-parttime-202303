import splice from './arrays.prototype.splice.mjs'

const months = ['Jan', 'March', 'April', 'June'];
const months2 = ['Jan', 'March', 'April', 'June'];

months.splice(1, 0, 'Feb');
splice(months2, 1, 0, 'Feb')
// Inserts at index 1

console.log(months);
console.log(months2)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
