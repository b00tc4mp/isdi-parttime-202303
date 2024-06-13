function fill(array, value, startIndex = 0, endIndex) {
    //debugger
    let start
    if (startIndex >= 0) {start = startIndex}
    if (startIndex < 0) {
        if (startIndex + array.length >= 0) {
            start = startIndex + array.length
        } else {
            start = 0
        }
    }
    if (startIndex < -array.length && !start) {start = 0}

    if (!endIndex || endIndex >= array.length) {
        for ( let i = start; i < array.length; i++) {
            array[i] = value
        }
        return array
    }

    if (endIndex > startIndex && endIndex < array.length && endIndex >= 0) {
        for ( let i = start; i < endIndex; i++) {
            array[i] = value
        }
        return array
    }

    if (endIndex < 0 && endIndex > -array.length) {
        for ( let i = start; i < endIndex + array.length; i++) {
            array[i] = value
        }
        return array
    }

    return array
}