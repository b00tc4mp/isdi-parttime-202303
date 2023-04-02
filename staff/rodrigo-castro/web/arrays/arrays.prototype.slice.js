const animals2 = ['ant', 'bison', 'camel', 'duck', 'elephant'];

const slice = (array, start = 0, end = array.length) => {
    let result = []
    let counter = 0
    
    if(end < -array.length || start > array.length) return []

    if(start < -array.length)
        start = 0

    if(end > array.length)
        end = array.length

    if(start < 0){
        
        if(end < 0){
            for(let i = array.length+start; i < array.length+end; i++){
                result[counter] = array[i]
                counter++
            }
            return result     
        }
        
        for(let i = array.length+start; i < end; i++){
            result[counter] = array[i]
            counter++
        }
        return result        
    }

    if(end < 0){
        for(let i = start; i < array.length+end; i++){
            result[counter] = array[i]
            counter++
        }
        return result   
    }

    for(let i = start; i < end; i++){
        result[counter] = array[i]
        counter++
    }
    return result
}

console.log(slice(animals2, 2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(slice(animals2, 2, 4));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals2, 1, 10));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(slice(animals2, -2));
// Expected output: Array ["duck", "elephant"]

console.log(slice(animals2, 2, -1));
// Expected output: Array ["camel", "duck"]

console.log(slice(animals2, -4, -2));
// Expected output: Array ["bison", "camel"]

console.log(slice(animals2, -15, -12))

console.log(slice(animals2, -2, -3))

console.log(slice(animals2, 3, 2))

console.log(slice(animals2));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]