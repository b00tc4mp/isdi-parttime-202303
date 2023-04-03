
function concat(array1, array2){

    for(let i = 0; i < array2.length; i++){
       array1.push(array2[i])
    } return array1

}

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];


console.log(concat(array1, array2));
// Expected output: Array ["a", "b", "c", "d", "e", "f"]


