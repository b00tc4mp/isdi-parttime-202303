function indexOf (array, element, fromIndex){
    let value

    if (!fromIndex){
        for(let i = 0; i < array.length; i++){
            if(array[i] === element){
                value = i
                return value
            }
        } return value ? value : -1
    } else {
        if (fromIndex >= 0){
            for (let i = fromIndex; i < array.length; i++){
               if(array[i] === element){
                value = i
                return value ? value : -1 
               }
            }
        } else {
            positiveIndex = -1*fromIndex
            initialPosition = array.length - positiveIndex
            for (let i = initialPosition; i < array.length; i++){
                if(array[i] === element){
                    value = i
                    return value
                }
            } return  value ? value : -1 
        }
    }
}