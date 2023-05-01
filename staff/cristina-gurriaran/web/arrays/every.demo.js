export function every(array, callback){
    for(let i = 0; i < array.length; i++){
        if(!callback(array[i])) return false
    }
    return true
}

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 39];

console.log(every(array1,(isBelowThreshold)));
// Expected output: true
