function concat(array1, array2) {
    let newArray = new Array()
    for (let element of array1) {
        newArray[newArray.length] = element
    }
    for (let element of array2) {
        newArray[newArray.length] = element
    }
    return newArray
}

export default concat