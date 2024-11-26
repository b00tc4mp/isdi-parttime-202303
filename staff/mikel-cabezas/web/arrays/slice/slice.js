function slice(array, position, end) {
    const newArray = []
    if(position === undefined) {
        position = 0
    }
    if(position < 0) {
        position = position + array.length
    }
    if(end < 0) {
        end = end + array.length
    }
    if(end === undefined) {
        end = array.length
    }

    for(i = position; i < end; i++) {
        newArray[newArray.length] = array[i]
    } 
    return array = newArray
}

