function slice(array, start, end){
    let newArray = []

    if(!start && !end || start < -array.length) { 
        let initialPosition = 0
        let index = 0

        for(let i = initialPosition; i < array.length; i++){
            newArray[index] = array[i]
            index++
        }
            return newArray
    }

    else if(!end){
        let initialPosition = start >= 0 ? start : start + array.length
        let index = 0

        for(let i = initialPosition; i < array.length; i++){
            newArray[index] = array[i]
            index++
        }
            return newArray
    } 
    
    else { 
        let initialPosition = start >= 0 ? start : start + array.length
        let endPosition = end >= 0 ? end : end + array.length
        let index = 0

        for(let i = initialPosition; i < endPosition; i++){
            newArray[index] = array[i]
            index++
        }
            return newArray
    }
}