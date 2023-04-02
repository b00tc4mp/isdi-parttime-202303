const reverse = (arr)=>{
  let newArr = [];
  for (let i = arr.length -1; i >= 0; i--) {
    newArr[newArr.length] = arr[i];
  }
  return newArr;
}