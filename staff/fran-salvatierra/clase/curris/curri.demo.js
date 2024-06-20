import Curri from './curri.js'

const c = new Curri

c[0] = 'A'
c.length++
c[1] = 'B'
c.length++
c[2] = 'C'
c.length++
c[3] = 'D'
c.length++
c[4] = 'E'
c.length++
c[5] = 'F'
c.length++
// console.log(Curri.of(c))

// c.forEach(elem => console.log(elem))

const c2 = c.map(elem => elem.toLowerCase())
// c2.forEach(elem => console.log(elem))

console.log(c.concat(c2));

//console.log(c.isCurri(c2))

//console.log(c.at(2))

// const isLowerCase = (element) => {
//     return element.toLowerCase() === element
// }


//console.log(c.every(isLowerCase))
//console.log(c2.every(isLowerCase))


//console.log(c.fill(0, 2, 7));
//console.log(c.fill(5, 1));
//console.log(c.fill(6));


//console.log(c.filter(isLowerCase))

//console.log(c.find(isLowerCase))

//console.log(c.findIndex(isLowerCase))

//console.log(c.includes(2))
//console.log(c.includes('F'))

//console.log(c.indexOf('d'))
//console.log(c.indexOf('d', 4))

//console.log(c.lastIndexOf('d'))
//console.log(c.lastIndexOf('d', 2))

//console.log(c.join())
//console.log(c.join('-'))

//console.log(c.pop())
//console.log(c)

//console.log(c.push('T'));
//console.log(c)


// const addChar = (acc, element) => {
//     return acc + element + 'char'
// }

//console.log(c.reduce(addChar))

// console.log(c.reverse())
// console.log(c)

//console.log(c.shift())
//console.log(c)

//console.log(c.slice(1,4))

//console.log(c.some(isLowerCase))

//console.log(c.splice(2 , 4, '1', '2', '3', '4', '5'))
//console.log(c)

// console.log(c.toReversed())
// console.log(c)

// console.log(c.unshift('1', '2', '3'))
// console.log(c)