function lastIndexOf(word, position, ...array) {
    const control = []
    for(i = array.length; i > 0; i--) {
        control[control.length] = 1
        if(word === array[i]) {
            if (position >= 1) {
                i = position 
            }
            return console.log(Number(i + position))
        } 
        if(word !== array[i]) {
            control.length--
        }   
    }
    if (control.length >= 0) {
        return console.log(-1)
    }
    if (word === NaN) {
        return console.log(-1)
    }
}

