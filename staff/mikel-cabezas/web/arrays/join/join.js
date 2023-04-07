function join(separator, ...arrays) {
    const toString = []
    let newString

    if (separator === ''){
        for (array of arrays) {
            // newArray[newArray.length] = number
            for (number of array) {
                toString = toString + number + separator
            }
        }
        return toString
    }


    if (separator === undefined){
        for (array of arrays) {
            // newArray[newArray.length] = number
            for (number of array) {
                toString = toString + number + ','
            }
        }
        return toString

    }
    if (separator !== undefined){
        for (array of arrays) {
            // newArray[newArray.length] = number
            for (number of array) {
                toString = toString + number + separator
            }
        }
        let deleteLastChar = '';

        for (let i = 0; i < toString.length - 1; i++) {
            deleteLastChar += toString[i];
        }
        newString = deleteLastChar
        return newString
    }



}
