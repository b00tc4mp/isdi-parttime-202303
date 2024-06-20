const idexOf = (array, element)=>{
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) return i;
  }
  return -1;
}