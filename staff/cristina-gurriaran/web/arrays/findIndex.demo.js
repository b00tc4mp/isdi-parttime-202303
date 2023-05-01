function findIndex (array, callback){
    for(let i = 0; i < array.length; i++) {
        if(callback(array[i]))
        return i
    }
    return -1
}

const array1 = [5, 12, 8, 130, 44];

const found = findIndex(array1,(element => element > 10))

console.log(found)
// Expected output: 12
