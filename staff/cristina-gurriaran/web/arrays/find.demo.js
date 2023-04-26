function find (array, callback){
    for(let i = 0; i < array.length; i++) {
        if(callback(array[i]))
        return array[i]
    }

    return undefined
}

const array1 = [5, 12, 8, 130, 44];

const found = find(array1,(element => element > 10))

console.log(found)
// Expected output: 12
