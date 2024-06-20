const array2 = [1, 2, 3, 4];

const fill = (array, fillElement, startElement = 0, endElement = array.length) => {
    if(endElement > array.length) 
        endElement = array.length

    if(endElement < 0){
        if(startElement < 0){
            for(let i = array.length+startElement; i < array.length+endElement; i++){
                array[i] = fillElement
            }
            return array
        }
        for(let i = startElement; i < array.length+endElement; i++){
            array[i] = fillElement
        }
        return array
    }

    if(startElement < 0){
        for(let i = array.length+startElement; i < endElement; i++){
            array[i] = fillElement
        }
        return array
    }

    for(let i = startElement; i <= endElement-1; i++){
        array[i] = fillElement;
    }
    return array
}

// Fill with 0 from position 2 until position 4
console.log(fill(array2, 0, -2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(fill(array2, 5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(fill(array2, 6));
// Expected output: Array [6, 6, 6, 6]
