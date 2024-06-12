function join(array, separator){
    let newArray = ''
 if (separator === '') {
    for(arr of array){
        let value = arr
        newArray = newArray + arr
    }
}
     else if(!separator){
        for(let i = 0; i < array.length; i++){
            let value = array[i]
            newArray = newArray + array[i] + (i < array.length-1 ? ',' : '')
        }
     }
    else {
        for(let i = 0; i < array.length; i++){
            let value = array[i]
            newArray = newArray + value + (i < array.length-1 ? separator : '')
        }
    } return newArray
}