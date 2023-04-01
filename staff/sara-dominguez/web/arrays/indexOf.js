function indexOf(array, element, position) {

    if(position === 0 || !position || position === ' ') {
        for(let i = 0; i < array.length; i++){
            if(element === array[i]) {
                return i    
            }
        }
        return -1
    }

    if(position < 0) {
        for(let i = (array.length + position); i < array.length; i++){
            if(element === array[i]) {
             return i
            }
        }
        return -1
    }
      

    if(position > array.length) {
        return -1
    }
   
    if(position < array.length){
        for(let i = position; i < array.length; i++){
            if(element === array[i]) {   
                return i
            }
        }
        return -1
    }
}
    
