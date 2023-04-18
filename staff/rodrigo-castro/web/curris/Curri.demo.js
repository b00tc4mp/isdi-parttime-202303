console.log('Curri.demo.js loaded')

import Curri from './Curri.js'

// /* eslint-disable-next-line indent */
// delete Array

const c = new Curri

c[0] = 'A'
c.length++
c[1] = 'B'
c.length++
c[2] = 'C'
c.length++


//console.log(c)

//for (var i = 0; i < c.length; i++)
//    console.log(c[i])
console.log('FOREACH METHOD')
c.forEach(elem => console.log(elem))

console.log('MAP METHOD')
const c2 = c.map(elem => elem.toLowerCase())
c2.forEach(elem => console.log(elem))

console.log('AT METHOD')
console.log(c.at(2))

console.log('CONCAT METHOD')
const d = new Curri
d[0] = 'd'
d.length++
d[1] = 'e'
d.length++
d[2] = 'f'
d.length++
const e = new Curri
e[0] = 'G'
e.length++
e[1] = 'H'
e.length++
e[2] = 'I'
e.length++
console.log(c.concat(d, e))

console.log('EVERY METHOD')
const array1 = new Curri
array1[0] = 1
array1.length++
array1[1] = 30
array1.length++
array1[2] = 39
array1.length++
array1[3] = 29
array1.length++
array1[4] = 10
array1.length++
array1[5] = 13
array1.length++
array1[6] = 42
array1.length++
console.log(array1.every(element => element < 15))

console.log('FILL METHOD')
const array2 = new Curri
array2[0] = 1
array2.length++
array2[1] = 2
array2.length++
array2[2] = 3
array2.length++
array2[3] = 4
array2.length++

// Fill with 0 from position 2 until position 4
console.log(array2.fill(0, -2, 4))
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array2.fill(5, 1))
// Expected output: Array [1, 5, 5, 5]

console.log(array2.fill(6))
// Expected output: Array [6, 6, 6, 6]

console.log('FILTER METHOD')
const array3 = new Curri
array3[0] = -3
array3.length++
array3[1] = -2
array3.length++
array3[2] = -1
array3.length++
array3[3] = 0
array3.length++
array3[4] = 1
array3.length++
array3[5] = 2
array3.length++
array3[6] = 3
array3.length++
array3[7] = 4
array3.length++
array3[8] = 5
array3.length++
array3[9] = 6
array3.length++
array3[10] = 7
array3.length++
array3[11] = 8
array3.length++
array3[12] = 9
array3.length++
array3[13] = 10
array3.length++
array3[14] = 11
array3.length++
array3[15] = 12
array3.length++
array3[16] = 13
array3.length++


function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array3.filter(isPrime)); // [2, 3, 5, 7, 11, 13]

console.log('FIND METHOD')
const greaterThanTen = (element) => element > 10

const array4 = new Curri
array4[0] = 15
array4.length++
array4[1] = 7
array4.length++
array4[2] = 8
array4.length++
array4[3] = 130
array4.length++
array4[4] = 44
array4.length++

const found = array4.find((element) => element < 8);
console.log(found)

console.log('FIND INDEX METHOD')
console.log(array4.findIndex((element) => element > 1022))

console.log('FOR EACH')
const array5 = new Curri
array5[0] = 'a'
array5.length++
array5[1] = 'b'
array5.length++
array5[3] = 'c'
array5.length++
array5.length++

array5.forEach(element => console.log(element))

console.log('INCLUDES METHOD')
console.log(array4.includes(130))

console.log('INDEX OF METHOD')
console.log(array4.indexOf(44))

console.log('JOIN METHOD')
console.log(array4.join('-'))

console.log('LAST INDEX OF METHOD')
console.log(array4.lastIndexOf(444))

console.log('REDUCE METHOD')
const array6 = new Curri

array6[0] = 1
array6.length++
array6[1] = 2
array6.length++
array6[2] = 3
array6.length++
array6[3] = 4
array6.length++

// console.log(array6.reduce(0))

console.log('REVERSE METHOD')
console.log(array3.reverse())

console.log('SHIFT METHOD')
console.warn(array6.shift())
console.warn(array6)

console.log('SLICE METHOD')
const animals = new Curri 
animals[0] = 'ant'
animals.length++
animals[1] = 'bison'
animals.length++
animals[2] = 'camel'
animals.length++
animals[3] = 'duck'
animals.length++
animals[4] = 'elephant'
animals.length++

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 10));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(-4, -2));
// Expected output: Array ["bison", "camel"]

console.log(animals.slice(-15, -12));

console.log(animals.slice(-2, -3));

console.log(animals.slice(3, 2));

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

console.log('SOME METHOD')
console.log(array3.some((element) => element === 9))
console.log(array3.some((element) => element === 90))
console.log(array3.some((element) => element === undefined)) // NO CUMPLE !!!  (debería ser false)

console.log('TO REVERSED METHOD')
console.log(array3)
console.log(array3.toReversed())

console.log('UNSHIFT METHOD')

const array7 = new Curri
array7[0] = 15
array7.length++
array7[1] = 7
array7.length++
array7[2] = 8
array7.length++
array7[3] = 130
array7.length++
array7[4] = 44
array7.length++

const array8 = new Curri
array8[0] = 1
array8.length++
array8[1] = 2
array8.length++
array8[2] = 3
array8.length++
array8[3] = 4
array8.length++

console.log(array7)
console.log(array8)
console.log(array7.unshift(array8))
console.log(array7)