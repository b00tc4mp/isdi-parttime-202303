const animals2 = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

const lastIndexOf = (array, element) => {
    for(let i = array.length; i >= 0; i--){
        if(array[i] === element){
            return i
        }
    }
    return -1
}

console.log(lastIndexOf(animals2, 'Dodo'));
// Expected output: 3

console.log(lastIndexOf(animals2, 'Tiger'));
// Expected output: 1
