import Curri from './Curri.js'
/*
describe('Curri', () => {
    describe('constructor', () => {
        it('should create a new instance with the given elements', () => {
            const c = new Curri(10, 20, 30)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(c[0]).toBe(10)
            expect(c[1]).toBe(20)
            expect(c[2]).toBe(30)
        })

        it('should create a new instance with no elements and the length of the given numeric argument', function () {
            const c = new Curri(10)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(10)
        })

        // TODO
        // const c3 = new Curri(true)
        // console.log(c3)
        // // Curri { 0: true, length: 1 }
    })
*/
    describe('forEach', () => {
        it('should iterate over a collection of elements', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            const a = []
            c.forEach(((elem, i) => a[i] = elem))

            expect(a.length).toBe(c.length)
            expect(a[0]).toBe(c[0])
            expect(a[1]).toBe(c[1])
            expect(a[2]).toBe(c[2])
        })
    })

    describe('map', () => {
        it('should iterate over a collection of elements and return a new collection with all them mapped', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            const c2 = c.map(elem => elem.toLowerCase())

            expect(c2).toBeInstanceOf(Curri)
            expect(c2.length).toBe(c.length)
            expect(c2[0]).toBe(c[0].toLowerCase())
            expect(c2[1]).toBe(c[1].toLowerCase())
            expect(c2[2]).toBe(c[2].toLowerCase())
        })
    })

    describe('push', () => {
        it('should add an element to the end of the array', () => {

            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            c.push('D', 'E')

            // expect(c3).toBe('D')
            expect(c[0]).toBe('A')
            expect(c[1]).toBe('B')
            expect(c[2]).toBe('C')
            expect(c[3]).toBe('D')
            expect(c[4]).toBe('E')
            expect(c.length).toBe(5)
        })
    })

    describe('pop', () => {
        it('should remove the last element of the array', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++
        
            const c4 = c.pop()
            expect(c4).toBe('C')
            expect(c[0]).toBe('A')
            expect(c[1]).toBe('B')
            expect(c.length).toBe(2)

            const c4A = c.pop()
            expect(c4A).toBe('B')
            expect(c[0]).toBe('A')
            expect(c.length).toBe(1)
        
        })

    })

    describe('some', () => {
        it('should test whether, at least, one element in the array passes the test implemented', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'b'
            c.length++
            c[2] = 'd'
            c.length++

            const isUpperCase = elem => elem === elem.toUpperCase()

            expect(c.some(isUpperCase)).toBe(true)

        })

    })

    describe('every', () => {
        it('tests whether all elements in the array pass the test implemented by the provided function', () => {
            const c = new Curri

            c[0] = 'a'
            c.length++
            c[1] = 'b'
            c.length++
            c[2] = 'c'
            c.length++
        
            const isLowerCase = elem => (elem === elem.toLowerCase())
            c.every(isLowerCase);
           
            expect(c.every(isLowerCase)).toBe(true)
        })

    })

    describe('concat', () => {
        it('should to merge two or more arrays', () => { 
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++
            
            const b = new Curri
            b[0] = 1
            b.length++
            b[1] = 2
            b.length++
            b[2] = 3
            b.length++
            
            const a = c.concat(b)
            expect(a[0]).toBe(c[0])
            expect(a[1]).toBe(c[1])
            expect(a[2]).toBe(c[2])
            expect(a[3]).toBe(b[0])
            expect(a[4]).toBe(b[1])
            expect(a[5]).toBe(b[2])
            expect(a.length).toBe((c.length) + (b.length))

        })
    })

    describe('fill', () => {
        it('should changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length)', () => { 
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
            
           c.fill(0, 2, 4)
            expect(c[0]).toBe('A')
            expect(c[1]).toBe('B')
            expect(c[2]).toBe(0)
            expect(c[3]).toBe(0)
            expect(c[4]).toBe('E')
            expect(c[5]).toBe('F')
           
            c.fill(5, 1)
            expect(c[0]).toBe('A')
            expect(c[1]).toBe(5)
            expect(c[2]).toBe(5)
            expect(c[3]).toBe(5)
            expect(c[4]).toBe(5)
            expect(c[5]).toBe(5)

            c.fill(6)
            expect(c[0]).toBe(6)
            expect(c[1]).toBe(6)
            expect(c[2]).toBe(6)
            expect(c[3]).toBe(6)
            expect(c[4]).toBe(6)
            expect(c[5]).toBe(6)
        })
    })
    
    describe('indexOf', () => {
        it('should return the first index at which a given element can be found in the array, or -1 if it is not present.', () => {
            const c = new Curri

            c[0] = 'Alien'
            c.length++
            c[1] = 'Beisbol'
            c.length++
            c[2] = 'Cats'
            c.length++
            c[3] = 'Beisbol'
            c.length++
        
            expect(c.indexOf('Alien')).toBe(0)
            expect(c.indexOf('Beisbol', 2)).toBe(3)
            expect(c.indexOf('at')).toBe(-1)
        })
    })

    // describe('lastIndexOf', () => {
    //     it('should return the first index at which a given element can be found in the array, or -1 if it is not present.', () => {
    //         const c = new Curri

    //         c[0] = 'Alien'
    //         c.length++
    //         c[1] = 'Beisbol'
    //         c.length++
    //         c[2] = 'Cats'
    //         c.length++
    //         c[3] = 'Beisbol'
    //         c.length++
        
    //         expect(c.lastIndexOf('Cats')).toBe(2)
    //         expect(c.lastIndexOf('Beisbol')).toBe(3)
    //         expect(c.lastIndexOf('Alien')).toBe(0)
    //         expect(c.lastIndexOf('Ali')).toBe(-1)
    //     })
    // })

    // describe('reverse', () => {
    //     it('should reverse an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first.', () => {
    //         const c = new Curri

    //         c[0] = '0'
    //         c.length++
    //         c[1] = '1'
    //         c.length++
    //         c[2] = '2'
    //         c.length++
    //         c[3] = '3'
    //         c.length++
        
    //         c.reverse('Curri1:')
    //         expect(c.reverse('Cats')).toBe(2)
    //         expect(c.reverse('Beisbol')).toBe(3)
    //         expect(c.reverse('Alien')).toBe(0)
    //         expect(c.reverse('Ali')).toBe(-1)
    //     })
    // })

    // describe('toReversed', () => {
    //     it('should reverse an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first.', () => {
    //         const c = new Curri

    //         c[0] = '0'
    //         c.length++
    //         c[1] = '1'
    //         c.length++
    //         c[2] = '2'
    //         c.length++
    //         c[3] = '3'
    //         c.length++
        
    //         c.reverse('Curri1:')
    //         expect(c.toReversed('Cats')).toBe(2)
    //         expect(c.toReversed('Beisbol')).toBe(3)
    //         expect(c.toReversed('Alien')).toBe(0)
    //         expect(c.toReversed('Ali')).toBe(-1)
    //     })
    // })

    describe('shift', () => {
        it('should removes the first element from an array and returns that removed element. This method changes the length of the array.', () => {
            const c = new Curri

            c[0] = 0
            c.length++
            c[1] = 1
            c.length++
            c[2] = 2
            c.length++
            c[3] = 3
            c.length++

            let firstElement = c[0]
            c.shift()
            expect(firstElement).toBe(0)
            expect(c[0]).toBe(1)
            expect(c[1]).toBe(2)
            expect(c[2]).toBe(3)

            c.shift()
            expect(firstElement).toBe(1)
            expect(c[0]).toBe(2)
            expect(c[1]).toBe(3)

        })
    })

    describe('at', () => {
        it('should take an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.', () => {
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
            expect(`Using an index of ${index} the item returned is ${c.at(index)}`).toBe("Using an index of -2 the item returned is 2"
            )

            c.push('4')
            expect(c.at(-1)).toBe('4')  
        })
    })


    // TODO
    //     console.log('Curry.of')
    //     const c = Curri.of(10, 20, 30)
    //     console.log(c)
    //     // Curry { 0: 10, 1: 20, 2: 30, length: 3 }
// })