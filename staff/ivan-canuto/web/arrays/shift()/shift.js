const shift = (arr)=>{
  let firstElement = arr[0]
  for (let i = 1; i < arr.length; i++) {
    arr[i-1] = arr[i]
  }
  arr.length--
  return firstElement;
}