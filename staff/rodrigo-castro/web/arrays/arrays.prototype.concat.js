const array11 = ['a', 'b', 'c'];
const array22 = ['d', 'e', 'f'];
const array32 = [true, 20, 'hola']

const concat = (...arrays) => {
    let result = []
    let counter = 0
    for(let array of arrays){
        for(let element of array){
            result[counter] = element
            counter++
        }
    }
    return result
}

const array33 = concat(array11, array22, array32);

console.log(array33);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]