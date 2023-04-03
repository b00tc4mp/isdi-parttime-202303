function reverse(array) {
    let newArray = new Array()

    for (let i = array.length-1; i >=0; --i) {
        newArray[newArray.length] = array[i]
    }

    for (let i = 0; i < newArray.length; i++) {
        array[i] =  newArray[i]
    }
    return array
}