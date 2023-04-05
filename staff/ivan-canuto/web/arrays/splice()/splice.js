const splice = (array, start, deleteCount, ...elements)=>{
  // Comprobaciones
  if(typeof start !== 'number') return alert('The start parameter is not a number')
  if(typeof deleteCount !== 'number') return alert('The deleteCounter parameter is not a number')
  // Borrar elementos
  for(let i = start; i < array.length - deleteCount; i++) {
    array[i] = array[i + deleteCount]
  }
  for(let i = 0; i < deleteCount; i++) {
    array.length--
  }
  // Añadir elementos
  for(let i = start; i < elements.length; i++) {
    array.length++
  }
  for(let i = array.length; i >= start + elements.length; i--) {
    array[i] = array[i - elements.length]
  }
  for(let i = 0; i <elements.length; i++) {
    array[start + i] = elements[i]
  }
  return array
}