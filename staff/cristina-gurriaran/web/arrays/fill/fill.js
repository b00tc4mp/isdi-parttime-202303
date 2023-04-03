
function fill(array,element,initialPosition,lastPosition){
    if (!lastPosition){
        for(let i=initialPosition; i<array.length; i++){
            array[i] = element
        } return array
    }

    if(!initialPosition){
        for(let i=0; i<array.length; i++){
            array[i] = element
        } return array

    }

    for(let i=initialPosition; i<lastPosition; i++){
        array[i] = element
    } return array

}

