function unshift(array, ...values) {
    const newArray = []
    
    for (let i = 0; i < values.length; i++) {
        newArray[i] = values[i]
    }

    for (let i = 0; i < array.length; i++) {
        newArray[i + values.length] = array [i]
    }

    for (let i = 0; i < newArray.length; i++) {
        array[i] = newArray[i]
    }

    return array.length
}