import Curri from "./curri";
import { describe, it, expect } from "./fried-green-tomato";

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
        })
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

    describe('from', () => {
        it('should create a new instance with the provided string', () => {
            const c = Curri.from('coding')
            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(6)
            expect(c[0]).toBe('c')
            expect(c[1]).toBe('o')
            expect(c[2]).toBe('d')
            expect(c[3]).toBe('i')
            expect(c[4]).toBe('n')
            expect(c[5]).toBe('g')
        })

        it('should create a new instance with the provided object', () => {
            const c = Curri.from([true, 101, 'coding'])
            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(3)
            expect(c[0]).toBe(true)
            expect(c[1]).toBe(101)
            expect(c[2]).toBe('coding')
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

    describe('fill', () => {
        it('should fill the curri with 0s from index 2 to last index', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, 2)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(10)
            expect(c1[1]).toBe(20)
            expect(c1[2]).toBe(0)
            expect(c1[3]).toBe(0)
        })

        it('should fill the curri with 0s from index 2 to last index even though lastIndex is higher than Curri.length', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, 2, 6)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(10)
            expect(c1[1]).toBe(20)
            expect(c1[2]).toBe(0)
            expect(c1[3]).toBe(0)
        })

        it('should fill all the curri with 0s', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(0)
            expect(c1[1]).toBe(0)
            expect(c1[2]).toBe(0)
            expect(c1[3]).toBe(0)
        })

        it('should fill last value of the curri with 0', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, -1)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(10)
            expect(c1[1]).toBe(20)
            expect(c1[2]).toBe(30)
            expect(c1[3]).toBe(0)
        })

        it('should fill curri-s indexes -3(1) up to -1(2) with 0', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, -3, -1)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(10)
            expect(c1[1]).toBe(0)
            expect(c1[2]).toBe(0)
            expect(c1[3]).toBe(40)
        })

        it('should not fill curri with 0s, start and end index out of bounds', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, -2, -4)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(10)
            expect(c1[1]).toBe(20)
            expect(c1[2]).toBe(30)
            expect(c1[3]).toBe(40)
        })

        it('should fill curri-s first 2 values with 0s, start index is so lower (-7) that equals start 0', () => {
            const c1 = new Curri (10, 20, 30, 40)
            c1.fill(0, -7, -2)
            expect(c1).toBeInstanceOf(Curri)
            expect(c1.length).toBe(4)
            expect(c1[0]).toBe(0)
            expect(c1[1]).toBe(0)
            expect(c1[2]).toBe(30)
            expect(c1[3]).toBe(40)
        })
    })

    describe('indexOf', () => {
        it('should return index 1', () => {
            const c = new Curri ('ant', 'bison', 'camel', 'duck', 'bison')
            const index = c.indexOf('bison')
            expect(index).toBe(1)
        })

        it('should return index 4', () => {
            const c = new Curri ('ant', 'bison', 'camel', 'duck', 'bison')
            const index = c.indexOf('bison', 2)
            expect(index).toBe(4)
        })

        it('should return index 4', () => {
            const c = new Curri ('ant', 'bison', 'camel', 'duck', 'bison')
            const index = c.indexOf('bison', -2)
            expect(index).toBe(4)
        })

        it('should return index -1', () => {
            const c = new Curri ('ant', 'bison', 'camel', 'duck', 'bison')
            const index = c.indexOf('giraffe')
            expect(index).toBe(-1)
        })
    })

    describe('join', () => {
        it('should return a string "Fire,Air,Water,Earth"', () => {
            const c = new Curri ('Fire', 'Air', 'Water', 'Earth')
            const word = c.join()
            expect(word).toBe('Fire,Air,Water,Earth')
            expect(word[4]).toBe(',')
            expect(word[9]).toBe('W')
        })

        it('should return a string "FireAirWaterEarth"', () => {
            const c = new Curri ('Fire', 'Air', 'Water', 'Earth')
            const word = c.join('')
            expect(word).toBe('FireAirWaterEarth')
            expect(word[4]).toBe('A')
            expect(word[9]).toBe('t')
        })

        it('should return a string "Fire-Air-Water-Earth"', () => {
            const c = new Curri ('Fire', 'Air', 'Water', 'Earth')
            const word = c.join('-')
            expect(word.length).toBe(20)
            expect(word[4]).toBe('-')
            expect(word[9]).toBe('W')
        })

        it('should return a string "Fire"', () => {
            const c = new Curri ('Fire')
            const word = c.join()
            expect(word.length).toBe(4)
            expect(word).toBe('Fire')
        })
    })
})