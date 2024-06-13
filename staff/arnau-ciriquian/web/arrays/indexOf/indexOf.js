function indexOf(array, element, index = 0) {
    let position = index
    if (position === 0) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return position = i
            }
        }
    }
    
    if (position > 0) {
        for (let i = position; i < array.length; i++) {
            if (array[i] === element) {
                return position = i
            }
        }
    }

    if (position < 0) {
        for (let i = array.length + index; i < array.length; i++) {
            if (array[i] === element) {
                return position = i
            }
        }
    }

    return -1
}