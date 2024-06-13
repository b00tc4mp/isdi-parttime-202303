export default function splice(array, start, deleteCount, ...items) {
  const extracted = [];

  for (let i = start; i < start + deleteCount; i++) {
    const element = array[i];

    extracted[extracted.length] = element;
  }

  if (deleteCount > 0) {
    for (let i = start + deleteCount; i < array.length; i++) {
      const element = array[i];
      // CAMBIADO EL - 1 POR EL - ITEMS.LENGTH
      array[i - (deleteCount - items.length)] = element;
    }

    //CAMBIADO EL - 1 POR - ITEMS.LENGTH
    array.length -= deleteCount - items.length;
  }

  //AÑADIDO ESTE FOR PARA RECORRER LOS ITEMS Y AÑADIRLOS EN LA POSICIÓN QUE TOQUE
  for (let i = 0; i < items.length; i++) {
    array[start + i] = items[i];
  }
  return extracted;
}
