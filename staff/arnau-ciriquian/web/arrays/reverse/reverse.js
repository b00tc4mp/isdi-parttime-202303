function reverse(array){
    let newArray = []
    let index = 0
    for (let i = array.length-1; i >= 0; --i){
        newArray[index] = array[i]
        index++
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = newArray[i]
    }
    return array
}