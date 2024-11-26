function fill(array, elementToInclude, startIndexeElement, finalIndexElement){
    if((!finalIndexElement || finalIndexElement === ' ') && (!startIndexeElement || startIndexeElement === ' ')){
        
        finalIndexElement = array.length;
        startIndexeElement = 0; 
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            array[i] = elementToInclude;
        }
        return array;
    }
    
    if(!finalIndexElement || finalIndexElement === ' '){
        finalIndexElement = array.length;
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            array[i] = elementToInclude;
        }
        return array;
    }

    

    for (let i = startIndexeElement; i < finalIndexElement; i++){
        array[i] = elementToInclude;
    }
        return array;
}

export default fill 
