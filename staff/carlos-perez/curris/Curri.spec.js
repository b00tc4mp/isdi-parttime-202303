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

            c.forEach((elem, i) => a[i] = elem)

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

    // TODO
    //     console.log('Curry.of')
    //     const c = Curri.of(10, 20, 30)
    //     console.log(c)
    //     // Curry { 0: 10, 1: 20, 2: 30, length: 3 }
})