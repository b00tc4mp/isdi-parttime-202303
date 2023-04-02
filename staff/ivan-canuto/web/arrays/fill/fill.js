const fill = (arr, element, start = 0, end = arr.length-1)=>{
  for (let i = start; i <= end; i++) {
    arr[i] = element;
  }
  return arr;
}