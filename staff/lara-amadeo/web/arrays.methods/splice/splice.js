
function splice(array, start, deleteCount, item){
    result = []  
    if(!item) return result

    else {
        for(let i = array.length-1; i <= start; i--){
            const element = array[i]
            array.length = element
        }
        array[start] = item

        if(deleteCount > 0){
            for(let i = start; i < array.length; i++)
        }
    }
}