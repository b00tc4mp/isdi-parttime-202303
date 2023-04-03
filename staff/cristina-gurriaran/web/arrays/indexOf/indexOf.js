
function indexOf(array,element,initialPosition){

    if(!initialPosition){
        for(let i=0; i < array.length; i++){
            if(array[i] === element){
                return i
            }
        }   
    }

    if(initialPosition > 0) {
        for(let i=initialPosition; i < array.length; i++){
            if(array[i] === element){
                return i
            }
        } 
    } 
    return -1
}
