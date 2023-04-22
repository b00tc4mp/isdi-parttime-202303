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

    console.log('caso 2 --forEach')
    const words = ['uno', 'dos', 'tres', 'cuatro'];
    words.forEach((function(word) {
        console.log(word);
          if (word === 'dos') {
              words.shift();
          }
      }))
    //expected 'uno','dos','cuatro'
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
    //expected D
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


console.log('caso 8--fill')
// Fill with 0 from position 2 until position 4
console.log(c.fill(0, 2, 4));
// Expected output: Curri ['A', 'B', 0, 0, 'E', 'F']

// Fill with 5 from position 1
console.log(c.fill(5, 1));
// Expected output: Curri [1, 5, 5, 5]

console.log(c.fill(6));
// Expected output: Curri [6, 6, 6, 6]
}
//CASO 9 ----- includes
{
    console.log('caso 9--includes')
    const c = new Curri

    c[0] = 'Alien'
    c.length++
    c[1] = 'Beisbol'
    c.length++
    c[2] = 'Cats'
    c.length++
    c[3] = 'Dog'
    c.length++

    console.log(c.includes('Alien'));
    // Expected output: true
     
    console.log(c.includes('Cats'));
    // Expected c.output: true
    
    console.log(c.includes('at'));
    // Expected output: false

    console.log('caso 2 --includes, con parametro de inicio')

    console.log(c.includes('Dog', 1))
    // Expected output: true

    console.log(c.includes('Dog', -2))
    // Expected output: true

    console.log(c.includes('Cats', -1))
    // Expected output: false

}
// CASO 10 ----- indexOf
{
    console.log('caso 10--indexOf')
    const c = new Curri

    c[0] = 'Alien'
    c.length++
    c[1] = 'Beisbol'
    c.length++
    c[2] = 'Cats'
    c.length++
    c[3] = 'Beisbol'
    c.length++

    console.log(c.indexOf('Alien'));
// Expected output: 0

// Start from index 2
    console.log(c.indexOf('Beisbol', 2));
// Expected output: 3

    console.log(c.indexOf('at'));
// Expected output: -1

}
// CASO 11 ----- lastIndexOf
{
console.log('caso 11--lastIndexOf')

const c = new Curri
c[0] = 'Alien'
c.length++
c[1] = 'Beisbol'
c.length++
c[2] = 'Cats'
c.length++
c[3] = 'Beisbol'
c.length++

console.log(c.lastIndexOf('Cats'));
// Expected output: 2
console.log(c.lastIndexOf('Alien'))
// Expected output: 0
console.log(c.lastIndexOf('Beisbol'));
// Expected output: 3

}

// CASO 12 ---- reverse
{
console.log('caso 12--reverse')

const c = new Curri
c[0] = '0'
c.length++
c[1] = '1'
c.length++
c[2] = '2'
c.length++
c[3] = '3'
c.length++

c.reverse('Curri1:');
// Expected output: "Curri1:" Curri {"0", "1", "2", "3"}


c.reverse('reversed Curri1:', 'reversed');
// Expected output: "reversed:" Curri {"3", "2", "1", "0"}

// Careful: reverse is destructive -- it changes the original array.

// TODO THIS CAMBIO PERMANENTE console.log ('Curri2:', c);

// Expected output: "Curri1:" Curri {"3", "2", "1", "0"}
}

// CASO 13 ---- toReversed
{
    console.log('caso 13--toReversed')
    
    const c = new Curri
    c[0] = '0'
    c.length++
    c[1] = '1'
    c.length++
    c[2] = '2'
    c.length++
    c[3] = '3'
    c.length++
    
    c.toReversed('Curri1:');
    // Expected output: "Curri1:" Curri {"0", "1", "2", "3"}
    
    c.toReversed('toReversed Curri1:', 'reversed');
    // Expected output: "reversed:" Curri {"3", "2", "1", "0"}
    
    // Careful: reverse is destructive -- it changes the original array.
    
    // TODO THIS CAMBIO PERMANENTE console.log ('Curri2:', c);
    
    // Expected output: "Curri1:" Curri {"3", "2", "1", "0"}
    }

// CASO 14 ---- shift
{
    console.log('caso 14--shift')
    const c = new Curri
    c[0] = '0'
    c.length++
    c[1] = '1'
    c.length++
    c[2] = '2'
    c.length++
    c[3] = '3'
    c.length++

    const firstElement = c[0] 
    c.shift();
    // Expected output: Array [1, 2, 3]

    console.log(firstElement);
    // Expected output: 0
}
// CASO 15 ----- at
{
    console.log('caso 15--at')

    const c = new Curri
    c[0] = '0'
    c.length++
    c[1] = '1'
    c.length++
    c[2] = '2'
    c.length++
    c[3] = '3'
    c.length++

    let index = -2
    console.log(`Using an index of ${index} the item returned is ${c.at(index)}`);
    // Expected output: "Using an index of 0 the item returned is 0"

    // let index = -2;
    // Expected output: "Using an index of -2 item returned is 2"
  
    // añadimos un elemento nuevo al curri y lo imprimimos
    c.push('4')
    console.log(c.at(-1))
    //expected output: 4
}