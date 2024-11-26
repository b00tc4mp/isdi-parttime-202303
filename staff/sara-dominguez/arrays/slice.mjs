function slice(array, start, end){
    const newArray = []
    newArrayIndex = 0
    for(let i = start; i < end; i++){
        newArray[newArrayIndex]= array[i]
        newArrayIndex += 1
    }
    return newArray
}

    export default slice
       
        
   
    