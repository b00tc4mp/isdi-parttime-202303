function includes(array, find) {
    let isFind 
    for(i = 0; i < array.length; i++) {
        if(array[i] === find) {
            return isFind = true
        } 
        if(find !== array[i]) {
            isFind = false
        }   
    }

    return isFind
}

