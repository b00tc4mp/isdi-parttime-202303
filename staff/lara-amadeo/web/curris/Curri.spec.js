import Curri from './Curri.js'

describe('Curri', () => {
    describe('constructor', () => {
        it('should create a new instance with the elements as parameters', ()=> {
            const c = new Curri(10, 20, 30)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(c[0]).toBe(10)
            expect(c[1]).toBe(20)
            expect(c[2]).toBe(30)
        })

        it('should create a new instance with no elements and the given numeric argument', () =>{
            const c = new Curri(10)
    
            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(10)
        })
    })

    describe('map', () =>{
        it('should iterate over a collection of elements and return a new collection of elements mapped', () =>{
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            
            const c2 = c.map(elem => elem.toLowerCase())   
            
            expect(c).toBeInstanceOf(Curri)
            expect(c2[0]).toBe(c[0].toLowerCase())
            expect(c2[1]).toBe(c[1].toLowerCase())
            expect(c2[2]).toBe(c[2].toLowerCase())
        })
    })

    describe('forEach', () => {
        it('should iterate over a collection of elements', () => {
            const c = new Curri(10, 20, 30)
            const c2 = new Curri
            c.forEach((elem, i) => c2[i] = elem * 2)

            expect(c).toBeInstanceOf(Curri)
            expect(c2).toBeInstanceOf(Curri)
            expect(c2[0]).toBe(20)
            expect(c2[1]).toBe(40)
            expect(c2[2]).toBe(60)
        })
    })

    describe('concat', () =>{
        it('should create a new collection of elements with the join of some collections', () => {
            const c = new Curri(10, 20, 30)
            const c2 = new Curri('A', 'B', 'C')
            const c3 = new Curri(40, 50, 60)
            const c4 = c.concat(c2, c3)

            expect(c).toBeInstanceOf(Curri)
            expect(c2).toBeInstanceOf(Curri)
            expect(c3).toBeInstanceOf(Curri)
            expect(c4).toBeInstanceOf(Curri)

            expect(c4[0]).toBe(c[0])
            expect(c4[1]).toBe(c[1])
            expect(c4[2]).toBe(c[2])
            expect(c4[3]).toBe(c2[0])
            expect(c4[4]).toBe(c2[1])
            expect(c4[5]).toBe(c2[2])
            expect(c4[6]).toBe(c3[0])
            expect(c4[7]).toBe(c3[1])
            expect(c4[8]).toBe(c3[2])
        })
    })

    describe('fill', () => {
        it('should replace an element from a colecction in the paramenters of the start and end value', () => {
            const c = new Curri(1,2,3)
            expect(c).toBeInstanceOf(Curri)

            const c1 = c.fill(4)
            expect(c1[0]).toBe(4)
            expect(c1[1]).toBe(4)
            expect(c1[2]).toBe(4)

            const cA = new Curri(1,2,3)
            expect(cA).toBeInstanceOf(Curri)

            const c2 = cA.fill(4, 1, 2)
            expect(c2[0]).toBe(1)
            expect(c2[1]).toBe(4)
            expect(c2[2]).toBe(3)

            const cB = new Curri(1,2,3)
            expect(cB).toBeInstanceOf(Curri)

            const c3 = cB.fill(4, 3, 3)
            expect(c3[0]).toBe(1)
            expect(c3[1]).toBe(2)
            expect(c3[2]).toBe(3)

            const cC = new Curri(1,2,3)
            expect(cC).toBeInstanceOf(Curri)

            const c4 = cC.fill(4, NaN, NaN)
            expect(c3[0]).toBe(1)
            expect(c3[1]).toBe(2)
            expect(c3[2]).toBe(3)
        })
    })

    describe('find', () => {
        it('should find the first element that the callback require', () => {
            const c = new Curri(5, 12, 8, 130, 44)
            const numbersLowerThanTen = element => element > 10

            const result = c.find(numbersLowerThanTen)

            expect(c).toBeInstanceOf(Curri)
            expect(result).toBe(12)
        })
    })

    describe('includes', () => {
        it('should verify if a collection of elements includes the element required', () => {

            const c = new Curri(1, 2, 3)
    
            const result1 = c.includes(2)
            const result2 = c.includes(5)
    
            const d = new Curri('dog', 'cat', 'sheep')
            
            const result3 = d.includes('dog')
            const result4 = d.includes('og')
    
            expect(c).toBeInstanceOf(Curri)
            expect(d).toBeInstanceOf(Curri)
            expect(result1).toBe(true)
            expect(result2).toBe(false)
            expect(result3).toBe(true)
            expect(result4).toBe(false)

        })
    })

    describe('indexOf', () => {
        it('should return the index of an element of a collection of elements', () => {
            const c = new Curri(45, 73, 12, 98, 7, 30, 12, 85)
    
            const r1 = c.indexOf(12)
            expect(r1).toBe(2)
            const r2 = c.indexOf(3)
            expect(r2).toBe(-1)
            const r3 = c.indexOf(12, -4)
            expect(r3).toBe(6)
            const r4 = c.indexOf(73, -6)
            expect(r4).toBe(-1)            
        })
    })

    describe('isArray', () => {
        it('should verify if the element is an array object', () => {
            const c = new Curri(1, 3, 5)

            const r = Curri.isCurri(c)

            expect(c).toBeInstanceOf(Curri)
            expect(r).toBe(true)


        })
    })

    describe('join', () => {
        it('should take the elements of a collection and unify them in one element. If it has a parameter, the resulting element should be divided by this parameter', () => {
            const c = new Curri('Fire', 'Air', 'Water')

            const r1 = c.join()
            expect(r1).toBe("Fire,Air,Water")
            const r2 = c.join('')
            expect(r2).toBe("FireAirWater")
            const r3 = c.join('-')
            expect(r3).toBe("Fire-Air-Water")
        })
    })

    // describe('lastIndexOf', () => {
    //     it('should return the position of a element in a collection of elements', () => {
    //         const c = new Curri(2, 5, 9, 2)

    //         const r1 = c.lastIndexOf(2)
    //         expect(r1).toBe(3)
    //         const r2 = c.lastIndexOf(7)
    //         expect(r2).toBe(-1)
    //         const r3 = c.lastIndexOf(2, 3)
    //         expect(r1).toBe(3)
    //         const r4 = c.lastIndexOf(2, -2)
    //         expect(r4).toBe(0)
    //     })
    // })
})





