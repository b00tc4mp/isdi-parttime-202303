function includes(array, element) {
    for(let i = 0; i < array.length; i++){
        if(array[i] === element){
            return true
        }
    } 
    return false    
}