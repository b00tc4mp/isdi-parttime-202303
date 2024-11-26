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

        // const c3 = new Curri(true)
        // console.log(c3)
        // // Curri { 0: true, length: 1 }
    })
})

describe('push', () => {
    describe('method push', () => {
        it('should add first element', () => {
            const c = new Curri

            const count = c.push('cows');

            expect(count).toBe(1)
            expect(c[0]).toBe('cows')
        })

        it('should add three elements chickens, cats, dogs', function() {
            const c = new Curri

            let count = c.push('cows');
            count = c.push('chickens', 'cats', 'dogs');

            expect(count).toBe(4)
            expect(c[0]).toBe('cows')
            expect(c[1]).toBe('chickens')
            expect(c[2]).toBe('cats')
            expect(c[3]).toBe('dogs')
        })

    })
})

describe('at', () => {
    describe('method at', () => {
        it('should 2 order element', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++

            expect(c.at(2)).toBe('C')
        })

        it('should -2 order element', () => {
            const c = new Curri

            c[0] = 'A'
            c.length++
            c[1] = 'B'
            c.length++
            c[2] = 'C'
            c.length++
            expect(c.at(-2)).toBe('B')
        })

    })
})

describe('concat', () => {
    describe('method concat', () => {
        it('should element a, b, c, d, e, f', () => {
            const c1 = new Curri
            const c2 = new Curri
            let c = new Curri

            c1[0] = 'a'
            c1.length++
            c1[1] = 'b'
            c1.length++
            c1[2] = 'c'
            c1.length++
            
            c2[0] = 'd'
            c2.length++
            c2[1] = 'e'
            c2.length++
            c2[2] = 'f'
            c2.length++

            c = c.concat(c1, c2)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(6)
            expect(c[0]).toBe('a')
            expect(c[1]).toBe('b')
            expect(c[2]).toBe('c')
            expect(c[3]).toBe('d')
            expect(c[4]).toBe('e')
            expect(c[5]).toBe('f')
        })

    })
})

describe('every', () => {
    describe('method every', () => {
        it('should element < 40 in 1,30,39,29,10,13', () => {
            const isBelowThreshold = (currentValue) => currentValue < 40;

            const c = new Curri

            c[0] = 1
            c.length++
            c[1] = 30
            c.length++
            c[2] = 39
            c.length++
            c[3] = 29
            c.length++
            c[4] = 10
            c.length++
            c[5] = 13
            c.length++

            expect(c.every(isBelowThreshold)).toBe(true)
        })

        it('should element < 40 in 1,30,39,50,10,13', () => {
            const isBelowThreshold = (currentValue) => currentValue < 40;
            
            const c = new Curri

            c[0] = 1
            c.length++
            c[1] = 30
            c.length++
            c[2] = 39
            c.length++
            c[3] = 50
            c.length++
            c[4] = 10
            c.length++
            c[5] = 13
            c.length++

            expect(c.every(isBelowThreshold)).toBe(false)
        })

    })
})


describe('fill', () => {
    describe('method fill', () => {
        it('should element 1, 2, 3, 4 fill 0 start 2 end 4', () => {
            const c = new Curri(1, 2, 3, 4)

            c.fill(0, 2, 4)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(4)
            expect(c[0]).toBe(1)
            expect(c[1]).toBe(2)
            expect(c[2]).toBe(0)
            expect(c[3]).toBe(0)


        })

        it('should element 1, 2, 3, 4 fill 5 start 2 ', () => {
            const c = new Curri(1, 2, 3, 4)

            c.fill(5, 1)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(4)
            expect(c[0]).toBe(1)
            expect(c[1]).toBe(5)
            expect(c[2]).toBe(5)
            expect(c[3]).toBe(5)


        })

        it('should element 1, 2, 3, 4 fill 6 start 0 ', () => {
            const c = new Curri(1, 2, 3, 4)

            c.fill(6)

            expect(c).toBeInstanceOf(Curri)
            expect(c.length).toBe(4)
            expect(c[0]).toBe(6)
            expect(c[1]).toBe(6)
            expect(c[2]).toBe(6)
            expect(c[3]).toBe(6)


        })
    })
})

describe('filter', () => {
    describe('method filter', () => {
        it('should element spray, exuberant, limit, elite, destruction, present filter word length >6', () =>{
            const c = new Curri('spray', 'exuberant', 'limit', 'elite', 'destruction', 'present')

            const callback = (word) => word.length > 6;

            let r = new Curri
            r = c.filter(callback)

            expect(r).toBeInstanceOf(Curri)
            expect(r.length).toBe(3)
            expect(r[0]).toBe('exuberant')
            expect(r[1]).toBe('destruction')
            expect(r[2]).toBe('present')

        })
    })
})
