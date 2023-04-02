
function unshift(array, ...elements) {

    const newArray = []
    for (let i = 0; i < elements.length; i++) {
        newArray[i] = elements[i]
    }

    index = newArray.length

    for(let i = 0; i < array.length; i++) {
    newArray[index] = array[i]
    index++
    }
    //return newArray.length

    for(let i = 0; i < newArray.length; i++) {
        array[i] = newArray[i]
        
    }
    return newArray.length
}

//TODO llevar los cambios del array a la variable global
