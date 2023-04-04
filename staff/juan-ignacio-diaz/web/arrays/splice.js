export default function splice(array, start, deleteCount, ...item) {
    if (start < 0) 
        start = Math.abs(array.length + start)
    if (start > array.length)
        start = array.length 

    for (let i = array.length + item.length - 1; i >= start; i--) {
        const element = array[i]

        array[i + 1] = element
    }

    array[start] = item1

    return []
}