function at(array, index){
    if(index > 0){ 
        const element = array[index]
        return element
    }
    if(index < 0){
        const element= array[array.length + index]
        return element
    }
}

export default at 
