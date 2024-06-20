function indexOf(array,element,initialPosition = 0){
        for(let i=initialPosition; i < array.length; i++){
            if(array[i] === element){
                return i
            }
        }    
    return -1
}


const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(indexOf(beasts,'bison'));
// Expected output: 1

// Start from index 2
console.log(indexOf(beasts,'bison',2));
// Expected output: 4

console.log(indexOf(beasts,'giraffe'));
// Expected output: -1