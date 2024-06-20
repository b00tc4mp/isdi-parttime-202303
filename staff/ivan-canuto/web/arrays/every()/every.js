const every = (array, callback)=>{
  for(const element of array) {
    if(!callback(element)) return false;
  }
  return true;
}

const lowerThanAHundred = element => element < 100
