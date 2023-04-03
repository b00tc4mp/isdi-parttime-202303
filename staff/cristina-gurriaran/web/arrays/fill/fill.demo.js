
function fill(array,element,initialPosition,lastPosition){
    
    if(!initialPosition && !lastPosition){
        for(let i=0; i<array.length; i++){
            array[i] = element
        } return array
    }

    if (!lastPosition){
        for(let i=initialPosition; i<array.length; i++){
            array[i] = element
        } return array
    }

    for(let i=initialPosition; i<lastPosition; i++){
        array[i] = element
    } return array

}

const array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(fill(array1, 0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(fill(array1, 5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(fill(array1, 6));
// Expected output: Array [6, 6, 6, 6]
