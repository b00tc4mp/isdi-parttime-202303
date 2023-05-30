const map = (array, callback)=>{
  let newArray = []
  for(let element of array) {
    element = callback(element)
    newArray[newArray.length] = element
  }
  return newArray
}

const biggerOrLowerThanTen = (element) => {
  if(element >= 10) return 10
  else return 0
}