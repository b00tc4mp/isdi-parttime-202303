function includes(array, objective){
    for(const element of array){
        if(element===objective){
            return true;
        }
    }
    return false;
}