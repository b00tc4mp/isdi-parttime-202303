
function reverse (input, array, reversed) {
    if (reversed=== ' ' ||!reversed){
        console.log(input, array)
        return array
    }
    if (reversed){
        const newArray = [...array]
        newArrayIndex = 0
        for(let i = array.length -1; i >= 0; i--){
            newArray[newArrayIndex]= array[i]
            newArrayIndex += 1
        }
        console.log(input, newArray)
        array = newArray
        console.log(array)
    }    
}//TODO que los cambios en array se mantengan fuera de la funacion.