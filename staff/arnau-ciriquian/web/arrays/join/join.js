function join(array, separator = ',') {
    let string = array[0]

    for (let i = 1; i < array.length; i++) {
        string = string + separator + array[i]
    }

    return string
}