function isArray(array){

    if(array.constructor === Array)
    return true
    
  
}


console.log(isArray([1, 3, 5]));
// Expected output: true

console.log(isArray('[]'));
// Expected output: false

console.log(isArray(new Array(5)));
// Expected output: true

console.log(isArray(new Int16Array([15, 33])));
// Expected output: false
