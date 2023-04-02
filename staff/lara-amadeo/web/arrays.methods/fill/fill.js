function fill(array, value, start, end){

    if(start === NaN && end === NaN) return array

    else if (start === NaN) return array

    else if(!start && !end){
        for(let i = 0; i < array.length; i++){
            array[i] = value
        } return array
    }

    else if(!end || end === NaN){
        startPosition = start >= 0 ? start : array.length + start

        if(startPosition >= array.length) return array

        for(let i = startPosition; i < array.length; i++){
            array[i] = value
        } return array
    }

    else {
        startPosition = start >= 0 ? start : array.length + start
        endPosition = end >= 0 ? end : array.length + end

        if(startPosition >= array.length) return array

        for(let i = startPosition; i < endPosition; i++ ){
            array[i] = value
        } return array
    }
}