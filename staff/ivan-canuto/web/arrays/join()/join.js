const join = (arr, element)=>{
  let string = '';
  for (let i = 0; i < arr.length; i++) {
    string = string + arr[i];
    if (arr[i] !== arr[arr.length - 1]) {
      string += element;
    }
  }
  return string;
}