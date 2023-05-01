function reduce (array){
    const accumulator = ''
    for(let i = 0; i < array.length; i++){
        accumulator += array[i]
    }
}

const array1 = [0, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  
);

console.log(sumWithInitial);
// Expected output: 10