function shift(array) {

    if(array > 0) {

        const  shift = array[0]
        for(i = 1; i < array.length; i++) {
            array[i - 1] = array[i]
        } 
        array.length--
        return shift 
    }
}