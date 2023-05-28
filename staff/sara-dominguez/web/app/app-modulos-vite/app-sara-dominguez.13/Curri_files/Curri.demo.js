import Curri from './Curri.js'

{
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

    //CASO 1 ----- forEach
    console.log('caso 1 --forEach')
    c.forEach(elem => console.log(elem))
    //expected 'A' 'B' 'C' 
}


//CASO 2 ----- map
{
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++

    console.log('caso 2 --map')
    const c2 = c.map(elem => elem.toLowerCase())
    c2.forEach(elem => console.log(elem))
    //expected 'a' 'b' 'c'
}
//CASO 3 ----push
console.log('caso 3 --push')
const c3 = c.push('D')
console.log(c3)
//expected 4
console.log(c)
//Expected Curri {"A", "B", "C", "D", length: 4}

//CASO 4 ---- pop
console.log('caso 4--pop')

const c4 = c.pop()
console.log(c4)
// Expected output: "D"
console.log(c)
// Expected output: Curri {"A", "B", "C", length: 3}


const c4A = c.pop()
console.log(c4A)
// Expected output: "C"
console.log(c)
// Expected output: Curri {"A", "B", length: 2}


// CASO 5 ----- some
console.log('caso 4--some')

const even = (element) => element % 2 === 0
const isUpperCase = elem => elem === elem.toUpperCase()

c.some(even)
// Expected output: false

c.some(isUpperCase)
// Expected output: true


//CASO 6 ----- every
const isLowerCase = elem => elem === elem.toLowerCase()

console.log(c.every(isLowerCase));
// Expected output: false
