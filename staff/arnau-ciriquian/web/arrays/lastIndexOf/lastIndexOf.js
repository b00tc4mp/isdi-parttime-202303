function lastIndexOf(array, element, index = -1) {
    let position = 0
    
    //debugger
    if (index < -array.length) {
        return position = -1
    }
    
    if (index === -1 || index >= array.length) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                position = i
            }
        }
        return position
    }

    if (index < -1 && index > -array.length) {
        for (let i = 0; i <= array.length - index; i++) {
            if (array[i] === element) {
                position = i
            } 
        }
        return position
    }

    return position = -1
}