const some = (array, callback)=>{
  for(const element of array) {
    if(callback(element)) return true;
  }
  return false;
}

const biggerThanAHundred = element => element >= 100
