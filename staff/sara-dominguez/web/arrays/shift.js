function shift(array){
    const firstElement = array[0];
    const newArray = []
    newArrayIndex = 0

    for(let i = 1; i < array.length; i++){ 
        newArray[newArrayIndex]= array[i]
        newArrayIndex += 1
    }
    console.log(newArray)
    console.log(firstElement)
    return newArray
}
//TODO exportar a global el valor nuevo del array y el first element.