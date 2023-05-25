function concat(...arrays) {
    const newArray = []
    let newIndex = 0
    
    for (let i = 0; i < arrays.length; i++) {
        let array = arrays[i]
        for (let j = 0; j < array.length; j++) {
            newArray[newIndex] = array[j]
            newIndex++
        }
    }

    return newArray
}