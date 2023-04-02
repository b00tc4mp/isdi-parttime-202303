const concat = (arr1, arr2)=>{
  let newArray = [];
  for (let i = 0; i < arr1.length; i++) {
    newArray[newArray.length] = arr1[i];
  }
  for (let j = 0; j < arr2.length; j++) {
    newArray[newArray.length] = arr2[j];
  }
  return newArray;
}

const concat2 = (arr1, arr2)=>{
  let newArray = [...arr1, ...arr2]
  return newArray;
}
