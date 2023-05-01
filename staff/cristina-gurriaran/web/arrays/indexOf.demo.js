function lastIndexOf(array,element){

    for(let i = array.length-1; i >= 0; i--){
        if(array[i] === element){
            return i
        }
    }     
}

const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(lastIndexOf(animals,'Dodo'));
// Expected output: 3

console.log(lastIndexOf(animals,'Tiger'));
// Expected output: 1
