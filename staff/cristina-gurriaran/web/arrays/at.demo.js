
function at(array, index){
    if(index < 0) index = array.length + index
    return array[index]
}


const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(at(array1,index))
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(at(array1,index))
// Expected output: "Using an index of -2 item returned is 130"
