function reverse(element) {
  const elementCopy = [...element]; //Para copiar el array sin modificar el original (y así no perder la info mientras se hace el for)

  for (let i = 0; i < elementCopy.length; i++) {
    element[i] = elementCopy[elementCopy.length - i - 1];
    element[element.length - i - 1] = elementCopy[i];
  }
  return element;
}
