function at(array,index){
    if (index >= 0) {
        for(let i = 0; i < array1.length ; i++){
            if(i === index) {
                return array1[i]
            }
        }
    } else if (index < 0) {
        for(let i = 0; i < array1.length; i++){
            if(i===array1.length-index){
                return array1[i]
            }
        }
    }
}


