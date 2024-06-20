const array2 = [1, 2, 3];

const unshift = (array, ...elements) => {
    let counter = 0
    for(let element of array){
        elements[elements.length] = element
    }
    for(let finalElement of elements){
        array[counter] = finalElement
        counter++
    }
    return array.length
}

console.log(unshift(array2, 4, 5));
// Expected output: 5

console.log(array2);
// Expected output: Array [4, 5, 1, 2, 3]
