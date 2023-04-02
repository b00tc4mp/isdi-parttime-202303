function at(array, index) {
    let value

    if (index >= 0){
        for(let i = 0; i < array.length; i++){
            if(i === index){
                value = array[i]
                return value
            }
        } 
    } else {
        let positiveIndex = -1*index
        let position = array.length - positiveIndex

        for(let i = (array.length-1); i >= 0; --i){
            if(i === position){
                value = array[i]
                return value    
            }
        } 
    } 
}