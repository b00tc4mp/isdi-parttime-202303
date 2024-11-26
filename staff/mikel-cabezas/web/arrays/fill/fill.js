function fill(fill, positionStart, positionEnd, ...array) {


    if(positionStart < 0) {
        positionStart = array.length + positionStart 
    }

    if(positionEnd < 0) {
        positionEnd = array.length + positionEnd 
    }

    if(positionStart && positionEnd === undefined) {
        for (i = positionStart; i < array.length; i++) {
            array[i] = fill
        }    
    }
    if(positionStart && positionEnd) {
        for (i = positionStart; i < positionEnd; i++) {
            array[i] = fill
        }    
    }
    if(positionStart === undefined && positionEnd === undefined) {
        for (i = 0; i < array.length; i++) {
            array[i] = fill
        }    
    }

    return array
}

