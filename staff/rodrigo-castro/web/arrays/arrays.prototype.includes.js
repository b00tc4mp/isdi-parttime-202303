const array2 = [1, 2, 3];

const includes = (myArray, elementSearched) => {
    for(const element of myArray) {
        if(element === elementSearched){
            return true
        }
    }
    return false
}

console.log(includes(array2, 2));
// Expected output: true

const pets2 = ['cat', 'dog', 'bat'];

console.log(includes(pets2, 'cat'));
// Expected output: true

console.log(includes(pets2, 'at'));
// Expected output: false
