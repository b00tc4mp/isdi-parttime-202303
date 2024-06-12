
{

    console.log('Curri.prototype.forEach');
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

    const c2 = c.map(elem => elem.toLowerCase())
    c2.forEach(elem => console.log(elem))
}

{
    console.log('Curri.of');
    const c = Curri.of(10, 20, 30);

    console.log(c);
    //Curry{0: 10, 1: 20, 2: 30}
}