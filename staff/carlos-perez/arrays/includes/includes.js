function includes(array, objective){
    for(let element of array){
        if(element===objective){
            return true;
        }
    }
    return false;
}