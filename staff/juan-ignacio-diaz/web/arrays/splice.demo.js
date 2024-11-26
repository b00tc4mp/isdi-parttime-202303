import splice from './splice.js'

const months = ['Jan', 'March', 'April', 'June']
splice(months, 1, 0, 'Feb')
// Inserts at index 1
console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

const nums = [1, 2, 3, 5, 6]
console.log(splice(nums, 3, 0, 4))
// Expected output: []
console.log(nums)
// Expected output: [1, 2, 3, 4, 5, 6]


const months2 = ["Jan", "Feb", "March", "April", "June"]
splice(months2, 4, 1, 'May');
// Replaces 1 element at index 4
console.log(months2);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

const months3 = ["Jan", "Feb", "March", "April", "-", "June", "July"]
console.log(splice(months3, 4, 2, 'May'));
// Replaces 1 element at index 4
console.log(months3);
const expectedOutput =  ["Jan", "Feb", "March", "April", "-", "June", "July"]
console.log(expectedOutput.splice(4, 2, 'May'))
console.log(expectedOutput) 
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]