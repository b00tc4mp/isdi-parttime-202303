const array2 = [5, 12, 8, 130, 44];
let index2 = 2;

const at = (array, index) => {
    if(index >= 0){
        for(let i = 0; i < array.length; i++){
            if(i === index){
                return array[i]
            }
        }
    }
    if(index < 0){
        for(let i = 0; i < array.length; i++){
            if(i === array.length+index){
                return array[i]
            }
        }
    }
    return undefined
}

console.log(`Using an index of ${index2} the item returned is ${at(array2, index2)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index2 = -2;

console.log(`Using an index of ${index2} item returned is ${at(array2, index2)}`);
// Expected output: "Using an index of -2 item returned is 130"

index2 = 20;

console.log(`Using an index of ${index2} item returned is ${at(array2, index2)}`);
// Expected output: "Using an index of 20 item returned is undefined"

index2 = -20

console.log(`Using an index of ${index2} item returned is ${at(array2, index2)}`);
// Expected output: "Using an index of -20 item returned is undefined"