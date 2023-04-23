import Curri from './Curri.js'

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

        it('should create a new instance with no elements and the length of the given numeric argument', function() {
            const c = new Curri(10)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(10)
        })
    })
    describe('forEach', () => {
        it('should iterate an array instance with the given elements', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            const a = []

            c.forEach((elem, i) => a[i] = elem)

            expect(c).toBeInstanceOf(Curri)
            expect(a.length).toBe(c.length)
            expect(a[0]).toBe(c[0])
            expect(a[1]).toBe(c[1])
            expect(a[2]).toBe(c[2])
        })
    })
    describe('pop', () => {
        it('should remove last item from array and return into a new variable', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++


            const a = c.pop(c)

            expect(c).toBeInstanceOf(Curri)
            expect(a[0]).toBe(c[2])

        })
    })
    
    describe('map', () => {
        it('should iterate an array with a callback ', () => {
            const c = new Curri

            c[0] = 1
            c.length++
            c[1] = 4
            c.length++
            c[2] = 9
            c.length++
            c[3] = 16
            c.length++

            const a = c.map(x => x * 2)

            expect(c).toBeInstanceOf(Curri)
            expect(a[0]).toBe(c[0] * 2)
        })
    })
    
    describe('slice', () => {
        it('should return from an array the elements between start and end', () => {
            const c = new Curri

            c[0] = 'ant'
            c.length++
            c[1] = 'bison'
            c.length++
            c[2] = 'camel'
            c.length++
            c[3] = 'duck'
            c.length++
            c[4] = 'elephant'
            c.length++

            c.slice(2, 4)
            const a = c.slice(2, 4)
            expect(c).toBeInstanceOf(Curri)
            expect(a.length).toBe(2)
            expect(a[0]).toBe(c[2])
            expect(a[1]).toBe(c[3])

        })
    })
    
    describe('lastIndexOf', () => {
        it('should return from an array the elements between start and end', () => {
            const c = new Curri

            c[0] = 'Dodo'
            c.length++
            c[1] = 'Tiger'
            c.length++
            c[2] = 'Penguin'
            c.length++
            c[3] = 'Dodo'
            c.length++

            // c.lastIndexOf(2, 4)
            const a = c.lastIndexOf('Dodo')
            expect(c).toBeInstanceOf(Curri)
            // expect(a.length).toBe(1)
            expect(a).toBe(3)
            // expect(a[1]).toBe(c[3])

        })
    })


    
    describe('join', () => {
        it('it returns an array converted in a string separated with a custom separator', () => {
            const c = new Curri

            c[0] = 'Fire'
            c.length++
            c[1] = 'Air'
            c.length++
            c[2] = 'Water'
            c.length++
       

            const c1 = c.join(',')
            const c2 = c.join('')
            const c3 = c.join('-')
            expect(c).toBeInstanceOf(Curri)
            expect(c1).toBe(c[0]+','+c[1]+','+c[2])
            expect(c2).toBe(c[0]+c[1]+c[2])
            expect(c3).toBe(c[0]+'-'+c[1]+'-'+c[2])
        })
    })

    
    describe('isCurri', () => {
        it('it returns true or false depends if variable passed is an array or not', () => {
            const c = new Curri

            c[0] = 1
            c.length++
            c[1] = 3
            c.length++
            c[2] = 4
            c.length++
            
            const b = new Curri
            
            const c1 = c.isCurri()
            const b1 = b.isCurri()

            expect(c).toBeInstanceOf(Curri)
            expect(b).toBeInstanceOf(Curri)
            expect(c1).toBe(true)
            expect(b1).toBe(false)
 
        })
    })


    
    describe('includes', () => {
        it('it returns true or false depends if array passed includes specific element', () => {


            const b = new Curri

            b[0] = 1
            b.length++
            b[1] = 2
            b.length++
            b[2] = 3
            b.length++


            const c = new Curri

            c[0] = 'cat'
            c.length++
            c[1] = 'dog'
            c.length++
            c[2] = 'bat'
            c.length++
            
      
            
            const b1 = b.includes(2)
            const c1 = c.includes('cat')
            const c2 = c.includes('at')

            expect(c).toBeInstanceOf(Curri)
            expect(b).toBeInstanceOf(Curri)
            expect(b1).toBe(true)
            expect(c1).toBe(true)
            expect(c2).toBe(false)

        })
    })





})

