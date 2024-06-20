var array = {0: 10, 1: 20, 2: 30, length: 3}

// Array.prototype.forEach.call(array, elem => console.log(elem))

var forEach = Array.prototype.forEach.bind(array)

forEach(elem => console.log(elem))