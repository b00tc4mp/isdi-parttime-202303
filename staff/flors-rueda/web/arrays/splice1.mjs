export const splice = (array, start, deleteCount, item) => {
    for(let i = array.length-1; i >= start; i--){
        const element = array [i]
        array[i+1] = element
    }
    array[start] = item
    return []
}