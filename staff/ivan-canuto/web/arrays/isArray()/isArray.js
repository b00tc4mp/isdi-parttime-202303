const isArray = (arr)=>{
  let result;
  if (Object.prototype.toString.call(arr) === "[object Array]") return window.alert("La variable arr es un arreglo.");
  else return window.alert("La variable arr no es un arreglo.");
}