export default function splice(array, start, deleteCount, ...items) {
    if (start < 0) 
        start = Math.abs(array.length + start)
    if (start > array.length)
        start = array.length 

    if (deleteCount === undefined || deleteCount > array.length - start) 
        deleteCount = array.length - start

    const extracted = []
  
    for (let i = start; i < start + deleteCount; i++) { 
      extracted[extracted.length] = array[i];
    }

    if (deleteCount > 0) {
      for (let i = start + deleteCount; i < array.length; i++) 
          array[i - (deleteCount - items.length)] = array[i]
      
      for (let i = 0; i < items.length; i++)
          array[start + i] = items[i]

      array.length -= deleteCount - items.length
    }

    return extracted
}