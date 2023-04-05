export const splice = (array, start, deleteCount, item) => {
    if(deleteCount !== 0){
        let deleted = array[start]
        array[start] = item
        return deleted
    } else {
        for(let i = array.length-1; i >= start; i--){
            const element = array [i];
            array[i+1] = element;
            deleteCount++
        }
        array[start] = item
        return []
    }
}
