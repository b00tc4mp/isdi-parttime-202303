function shift(array){
    const array0 = array[0]
    for (let i = 1 ; i < array.length; i++) {
        array[i-1]= array[i]
    }
    array.length--
    return array0
}

export default shift