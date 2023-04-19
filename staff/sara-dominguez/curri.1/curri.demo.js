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
{
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++

    console.log('caso 3 --push')
    const c3 = c.push('D')
    console.log(c3)
    //expected 4
    console.log(c)
    //Expected Curri {"A", "B", "C", "D", length: 4}

}
    //CASO 4 ---- pop
{  
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++

    
    console.log('caso 4--pop')
    const c4 = c.pop()
    console.log(c4)
    // Expected output: "C"
    console.log(c)
    // Expected output: Curri {"A", "B", length: 2}


    const c4A = c.pop()
    console.log(c4A)
    // Expected output: "B"
    console.log(c)
    // Expected output: Curri {"A", length: 1}

}
// CASO 5 ----- some
{
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++
    console.log('caso 5--some')

    const even = (element) => element % 2 === 0
    const isUpperCase = elem => elem === elem.toUpperCase()

    c.some(even)
    // Expected output: false

    c.some(isUpperCase)
    // Expected output: true

}
//CASO 6 ----- every
{
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++

    const isLowerCase = elem => (elem === elem.toLowerCase())
    console.log('caso 6--every')
    c.every(isLowerCase);
    // Expected output: false
}
//CASO 7 ----- concat
{
    const c = new Curri

    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++
    
    const b = new Curri
    b[0] = '1'
    b.length++
    b[1] = '2'
    b.length++
    b[2] = '3'
    b.length++
    
    console.log('caso 7--concat')
    c.concat(b)
    // Expected output: Curri ["A", "B", "C", "1", "2", "3"]
    
}
//CASO 8 ----- fill
{
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


console.log('caso 7--fill')
// Fill with 0 from position 2 until position 4
console.log(c.fill(0, 2, 4));
// Expected output: Curri ['A', 'B', 0, 0, 'E', 'F']

// Fill with 5 from position 1
console.log(c.fill(5, 1));
// Expected output: Curri [1, 5, 5, 5]

console.log(c.fill(6));
// Expected output: Curri [6, 6, 6, 6]


}