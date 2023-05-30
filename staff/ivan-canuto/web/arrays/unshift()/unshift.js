const unshift = (arr, ...elements)=>{
  for(let i = 0 ; i < elements.length; i++) {
    arr.length++
  }
  for(let j = arr.length-1; j >= 0; j--) {
    arr[j] = arr[j-elements.length]
  }
  for(let k = 0; k < elements.length; k++) {
    arr[k] = elements[k]
  }
  return arr.length;
}