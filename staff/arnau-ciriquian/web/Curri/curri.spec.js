import Curri from "./curri.js";

describe('Curri', () => {
    describe('constructor', () => {
        it('should create a new instance with the provided elements', () => {
            const c = new Curri(10, 20, 30)

            expect(c).toBeInstanceOf(Curri)
            expect(c[0]).toBe(10)
            expect(c[1]).toBe(20)
            expect(c[2]).toBe(30)
        })

        it('should create a new instance with a length equal to the provided value', () => {
            const c = new Curri(10)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(10)
        })

        it('should create a new instance with the provided boolean as the first element', () => {
            const c = new Curri(true)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(1)
            expect(c[0]).toBe(true)
        } 
        )
    })
    
    describe('of', () => {
        it('should create a new instance with the provided elements', () => {
            const c = Curri.of(true, 101, 'coding')

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(c[0]).toBe(true)
            expect(c[1]).toBe(101)
            expect(c[2]).toBe('coding')
        })

        it('should create a new instance with a single numeric element and a length of 1', () => {
            const c = Curri.of(101)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(1)
            expect(c[0]).toBe(101)
        })
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

    describe('at', () => {
        it('should return the value stored in the chosen index', () => {
            const c = Curri.of(true, 101, 'coding')
            const value2  = c.at(2)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(value2).toBe('coding')
        })

        it('should return the value stored in the chosen negative index', () => {
            const c = Curri.of(true, 101, 'coding')
            const value2  = c.at(-2)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(value2).toBe(101)
        })
    })

    describe('concat', () => {
        it('should return a new Curri with the combinaton of two curries', () => {
            const c1 = new Curri (10, 20, 30)
            const c2 = new Curri (40, 50, 60)

            const c3 = c1.concat(c2)

            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(3)
            expect(c2).toBeInstanceOf(Curri)
            expect(c2.length).toBe(3)
            expect(c3).toBeInstanceOf(Curri)
            expect(c3.length).toBe(6)
            expect(c3[0]).toBe(10)
            expect(c3[1]).toBe(20)
            expect(c3[2]).toBe(30)
            expect(c3[3]).toBe(40)
            expect(c3[4]).toBe(50)
            expect(c3[5]).toBe(60)
        })

        it('should return a new Curri with the combinaton of three curries', () => {
            const c1 = new Curri (10, 20, 30)
            const c2 = new Curri (40, 50, 60)
            const c3 = new Curri (70, 80, 90)

            const c4 = c1.concat(c2, c3)

            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(3)
            expect(c2).toBeInstanceOf(Curri)
            expect(c2.length).toBe(3)
            expect(c3).toBeInstanceOf(Curri)
            expect(c3.length).toBe(3)
            expect(c4).toBeInstanceOf(Curri)
            expect(c4.length).toBe(9)
            expect(c4[0]).toBe(10)
            expect(c4[1]).toBe(20)
            expect(c4[2]).toBe(30)
            expect(c4[3]).toBe(40)
            expect(c4[4]).toBe(50)
            expect(c4[5]).toBe(60)
            expect(c4[6]).toBe(70)
            expect(c4[7]).toBe(80)
            expect(c4[8]).toBe(90)
        })
    })
})