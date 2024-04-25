export const reduce = (array, callback, initialValue) => {  
  let reduceResult = initialValue === undefined ? array[0] : initialValue;
  let start = initialValue === undefined ? 1 : 0;
  
  for (let i = start; i < array.length; i++) {
    reduceResult = callback(reduceResult, array[i]);
  }
  return reduceResult;
}