function reduce(array, initialValue) {
    if(array.some(element => typeof element === 'string' && initialValue === undefined)) {
        initialValue = ''
    }
    
    if(array.some(element => typeof element === 'number' && initialValue === undefined)) {
        initialValue = 0
    }

    let accum = initialValue
    for(let i = 0; i < array.length; i++) {
        accum = accum + array[i]
    }
    return accum
}

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// Expected output: 10

console.log(reduce(array1, initialValue))

const array2 = ['hola ', 'qué ', 'tal?']

console.log(array2.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    ''
))

console.log(reduce(array2, ''))

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

console.log(array.reduce((accumulator, currentValue) => accumulator + currentValue))

console.log(reduce(array))

console.log('*** REDUCE CON STRINGS SIN INITIAL VALUE ***')

console.log(array2.reduce((accumulator, currentValue) => accumulator + currentValue))
console.log(reduce(array2))