function shift(array){
    let removed
    if(array.length === 0) return undefined

    else {
        removed = array[0]
        for(let i = 1; i < array.length; i++){
            array[i-1] = array[i]
        } 
        array.length = array.length-1
        return removed
    }
}