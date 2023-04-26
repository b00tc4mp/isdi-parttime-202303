import Curri from './curri.mjs'

const c = new Curri

c[0] = 'A'
c.length++
c[1] = 'B'
c.length++
c[2] = 'C'
c.length++
c[3] = 'B'
c.length++


// c.forEach(elem => console.log(elem))

// console.log(c.at(1))

// console.log(c.join())

// console.log(c.indexOf('B',2))

// // console.log(c.fill('3'))

// const a = new Curri
// a[0] = 'A'
// a.length++
// a[1] = 'B'
// a.length++
// a[2] = 'C'
// a.length++

// console.log(c.concat(a))

// console.log(c.isCurri(a))

const isAString = (element) => typeof element === 'string'
// console.log(c.every(isAString))

// console.log(c.filter(isAString))

// console.log(c.find(isAString))

// console.log(c.findIndex(isAString))

// console.log(c.includes('B'))

const b = new Curri

b[0] = '2'
b.length++
b[1] = '4'
b.length++
b[2] = '6'
b.length++
b[3] = '8'
b.length++

// console.log(b.map(x => x * 2))
// const toLowerCase = (element) => element = element.toLowerCase

// console.log(b.pop())
// console.log(b)

console.log(b.push('10'))
console.log(b)


