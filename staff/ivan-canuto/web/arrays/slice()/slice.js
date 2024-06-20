const slice = (arr, start, end = arr.length-1)=>{
  let newArr = [];
  for (let i = start; i < end; i++) {
    newArr[newArr.length] = arr[i]
  }
  return newArr;
}