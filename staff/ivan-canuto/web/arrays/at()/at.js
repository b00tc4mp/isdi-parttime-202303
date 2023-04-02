const atIndex = (arr, index)=>{
  let negativeNumber = false;
  let temporaryIndex = String(index)
  for(let i = 0; i < temporaryIndex.length; i++) {
    if (temporaryIndex.includes('-')) {
      negativeNumber = true;
      temporaryIndex = temporaryIndex.slice(1);
    }
  }
  if(!negativeNumber) {
    for (let i = 0; i < arr.length; i++) {
      if (i === index) return arr[i];
    }
  }
  if(negativeNumber) {
    let newArr = [];
    for (let i = arr.length -1; i >= 0; i--) {
      newArr[newArr.length] = arr[i];
    }
    for(let i = newArr.length-1; i >= 0; i--) {
      if (i === temporaryIndex-1) return newArr[i];
    }
  }
  return undefined;
}