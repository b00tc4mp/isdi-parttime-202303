function join(array, separator) {
    if (separator === undefined) separator = ','
    let arrayJoin = array[0]

    for (let i = 1; i < array.length; i++) {
        arrayJoin += separator+array[i]
    }
    return arrayJoin
}

export default join