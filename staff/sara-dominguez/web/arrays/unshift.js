function unshift(array, ...elements) {
    const newArray = [...elements]
    newArrayIndex = 0

      
    for(let i = 0; i < array.length; i++) {
        const element = array[i];
        newArray[newArray.length] = element
    }
    return newArray.length

}
//TODO llevar los cambios del array a la variable global
