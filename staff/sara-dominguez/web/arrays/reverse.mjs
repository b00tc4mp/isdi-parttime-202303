
function reverse (input, array, reversed) {
    const newArray = []
    newArrayIndex = 0

    if (reversed=== ' ' ||!reversed){
        console.log(input, array)
        return array
    }
    if (reversed){
        
        for(let i = array.length -1; i >= 0; i--){
            newArray[newArrayIndex]= array[i]
            newArrayIndex += 1
        }
        console.log(input, newArray)
        
        for (let i = 0; i < array.length; i++) {
        array[i] = newArray[i]
        }
        return array
    }
   
}

export default reverse


