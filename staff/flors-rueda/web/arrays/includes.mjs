export const includes = (array, element) => {
    for(item of array){
        if(element === item) return true;
    };
    return false
}