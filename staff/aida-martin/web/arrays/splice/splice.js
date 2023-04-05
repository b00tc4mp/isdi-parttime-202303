export default function splice(array, start, deleteCount, item) {
  const deleteItem = [array[start]];

  for (let i = array.length - 1; i >= start; i--) {
    const element = array[i];

    if (deleteCount !== 0) {
      array[start] = item;
      return deleteItem;
    }

    array[i + 1] = element;
  }

  array[start] = item;

  return [];
}
