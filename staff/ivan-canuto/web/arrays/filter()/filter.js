const filter = (array, callback)=>{
  let newArray = []
  for(element of array) {
    if(callback(element)) newArray[newArray.length] = element
  }
  return newArray
}

const longerThanThree = element=> element.length > 3