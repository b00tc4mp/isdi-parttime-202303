const array2 = [1, 2, 3, true, 'hola'];

const shift = (array2) => {
    let firstElement = array2[0]
    for(let i = 1; i < array2.length; i++){
        array2[i-1] = array2[i]
    }
    array2.length = array2.length - 1
    return firstElement
}

const firstElement2 = shift(array2);

console.log(array2);
// Expected output: Array [2, 3]

console.log(firstElement2);
// Expected output: 1
