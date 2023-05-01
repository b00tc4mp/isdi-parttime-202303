function filter(array, callback){
    const newArray = []
    
    for(let i = 0; i < array.length; i++){
        if(callback(array[i]))
        newArray[newArray.length] = array[i]
    }
    return newArray
}

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = filter(words, (word => word.length > 6))

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
