import Curri from './Curri.js'

{
    console.log('Curri')

    const c = new Curri(10, 20, 30)
    console.log(c)
    // Curri { 0: 10, 1: 20, 2: 30, length: 3 }

    const c2 = new Curri(10)
    console.log(c2)
    // Curri { length: 10 }

    const c3 = new Curri(true)
    console.log(c3)
    // Curri { 0: true, length: 1 }
}

{
    console.log('Curri.prototype.forEach')

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
    
    c.forEach(elem => console.log(elem))
    // 'A'
    // 'B'
    // 'C'

    c.forEach((elem, i, c) => console.log(elem, i, c))
    // 'A' 0 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3 }
    // 'B' 1 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3 }
    // 'C' 2 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3 }
}

{
    console.log('Curri.prototype.map')

    const c = new Curri
    
    c[0] = 'A'
    c.length++
    c[1] = 'B'
    c.length++
    c[2] = 'C'
    c.length++

    const c2 = c.map(elem => elem.toLowerCase())
    c2.forEach(elem => console.log(elem))
    // 'a'
    // 'b'
    // 'c'
}

{
    console.log('Curry.of')

    const c = Curri.of(10, 20, 30)

    console.log(c)
    // Curry { 0: 10, 1: 20, 2: 30, length: 3 }
}