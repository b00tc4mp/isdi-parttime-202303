function lastIndexOf(array) {
    for(i = array.length; i > 0; i--) {
        console.log(array[i])
        array[i] = array[i]
        console.log(array[i])
    } 
}

