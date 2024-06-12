
function splice(array, start, deleteCount, item){
    for(let i = array.length; i >start; i--){
        array[i] = array[i-1]
    }

    array[start] = item

    return []
}