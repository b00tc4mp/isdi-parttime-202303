export function lastIndexOf(array, element, lessThanPosition){
    let value

    if(!lessThanPosition){
        for(let i = array.length-1; i >= 0; --i){
            if(array[i] === element) {
                value = i
                return value
            }
        } return value ? value : -1
    } else {
        if (lessThanPosition >= 0){
            for(let i = lessThanPosition; i >= 0; --i){
                if (array[i] === element){
                    value = i
                    return value
                }
            } return -1
        } else {
           const initialPosition = array.length + lessThanPosition
            for(let i = initialPosition; i >= 0; --i){
                if(array[i] === element){
                    value = i
                    return value
                }
            } return -1
        }
    }
}
    