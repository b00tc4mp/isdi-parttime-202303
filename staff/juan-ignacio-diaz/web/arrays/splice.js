export default function splice(array, start, deleteCount, ...item) {
    if (start < 0) 
        start = Math.abs(array.length + start)
    if (start > array.length)
        start = array.length 

    if (deleteCount === undefined || deleteCount > array.length - start) 
        deleteCount = array.length - start

console.log(start, deleteCount)

    for (let i = array.length + item.length - deleteCount - 1; i > start + deleteCount - item.length -1; i--) 
        array[i] = array[i - item.length + deleteCount]
    
    for (let i = 0; i < item.length; i++)
        array[start + i] = item[i]

    //array.length = array.length + item.length - deleteCount-1

    return []
}