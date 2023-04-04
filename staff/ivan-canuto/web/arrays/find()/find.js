const find = (array, callback)=>{
  for(element of array) {
    if(callback(element, 't')) return element
  }
  return undefined
}

const includesLetter = (element, letter) => {
  if(typeof element !== 'string' || typeof letter !== 'string') return console.log('One of the parameters of the callback function is not a string');
  for(let i = 0; i < element.length; i++) {
    if(element[i] === letter) return element;
  }
  return undefined
}