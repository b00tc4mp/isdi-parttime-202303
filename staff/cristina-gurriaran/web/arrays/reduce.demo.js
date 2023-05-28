function reduce(array, callback, initialValue){
  let start
  let accumulator

  if(initialValue === undefined) 
  accumulator = array[0]
  else 
  accumulator = initialValue
  
  if(initialValue === undefined)
  start = 1
  else 
  start = 0
  
  for (let i = start; i < array.length; i++)
   accumulator = callback(accumulator, array[i])
  
  return accumulator
}

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = reduce(array1,
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10