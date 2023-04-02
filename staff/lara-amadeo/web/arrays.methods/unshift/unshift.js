function unshift(array, ...elements){
    let newArray = []
    let index = 0
    for(let i = 0; i < elements.length; i++){
        newArray[index] = elements[i]
        index++
    }

    for(let i = 0; i < array.length; i++)
        newArray[newArray.length] = array[i]
    
    for(let i = 0; i < newArray.length; i++)
        array[i] = newArray[i]

    return newArray.length
}