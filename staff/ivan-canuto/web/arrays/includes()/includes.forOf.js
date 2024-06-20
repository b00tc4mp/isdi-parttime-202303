const includes = (array, element)=>{
  for (item of array) {
    if (item === element) return true;
  }
  return false;
}