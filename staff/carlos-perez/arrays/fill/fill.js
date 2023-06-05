function fillSimple(array, filler, startPosition, endPosition){
    for(let i=startPosition; i<endPosition; i++){
        array[i]=filler;
    }
}

function fill(array, filler, startPosition, endPosition){
    if(startPosition===undefined && endPosition===undefined){
        fillSimple(array, filler, 0, array.length);
    }
    else if(startPosition===undefined){
        if(endPosition>=0){
            fillSimple(array, filler, 0, endPosition);
        }
        else{
            fillSimple(array, filler, 0, array.length+endPosition);
        }
    }
    else if(endPosition===undefined){
        if(startPosition>=0){
            fillSimple(array, filler, startPosition, array.length);
        }
        else{
            fillSimple(array, filler, array.length+startPosition, array.length);
        }
    }
    else{
        if(startPosition<0){
            startPosition=array.length+startPosition;
        }
        if(endPosition<0){
            endPosition=array.length+endPosition;
        }
        fillSimple(array, filler, startPosition, endPosition);
    }
}
