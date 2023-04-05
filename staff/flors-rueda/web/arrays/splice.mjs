export const splice = (array, start, deleteCount, ...elements) => {
    const deletedItems = new Array(deleteCount);
    
    let index = 0;
    for (let i = start; i < start + deleteCount; i++) {
        deletedItems[index] = array[i];
        index += 1;
    }

    if (elements.length < deleteCount) {
      for (let i = start + deleteCount; i < array.length; i++) {
        array[i - (deleteCount - elements.length)] = array[i];
      }
      array.length = array.length - deleteCount - elements.length;

    } else if (elements.length > deleteCount) {
      for (let i = array.length - 1; i >= start + deleteCount; i--) {
        array[i + (elements.length - deleteCount)] = array[i];
      }
      array.length += elements.length - deleteCount;
    }
  
    for (let i = 0; i < elements.length; i++) {
      array[start + i] = elements[i];
    }

    while (array[array.length - 1] === undefined || array[array.length - 1] === null) {
        array.length = array.length - 1;
    }
  
    return deletedItems;
  };