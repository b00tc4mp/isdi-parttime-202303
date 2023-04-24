describe('Curri', () => {
    describe('constructor', () => {
        it('should create a new instance with the given elements', () => {
            const c = new Curri(10, 20, 30);

            expect(c).toBeInstanceOf(Curri);
            expect(c.length).toBe(3);
            expect(c[0]).toBe(10);
            expect(c[1]).toBe(20);
            expect(c[2]).toBe(30);
        })
        
        it('should create a new instance with no elements and the length of the given numeric argument', function () {
            const c = new Curri(10);

            expect(c).toBeInstanceOf(Curri);
            expect(c.length).toBe(10);
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

    describe('push', () => { it('should add new elements at the end of Curri', () => {
        const c = new Curri;

        const result = c.push(10,20,30);

        expect(c).toBeInstanceOf(Curri);
        expect(c.length).toBe(3);
        expect(c.length).toBe(result);
        expect(c[0]).toBe(10);
    })

    
})

describe('pop', () => { it('should delete the last element of Curri', () =>{
    const c = new Curri(10, 20, 30);

    const result = c.pop();

    expect(c).toBeInstanceOf(Curri);
    expect(c.length).toBe(2);
    expect(result).toBe(30);

})})


describe('includes', () => { it('should check if a given element is an element of Curri', () =>{
    const c = new Curri(10, 20, 30);

    const result = c.includes(30);

    expect(c).toBeInstanceOf(Curri);
    expect(c.length).toBe(3);
    expect(result).toBe(true);

    const result2 = c.includes(1);

    expect(result2).toBe(false);

})})

describe('at', () => { it('should return the element of Curri at given index', () =>{
    const c = new Curri(10, 20, 30);

    const result = c.at(1);

    expect(c).toBeInstanceOf(Curri);
    expect(result).toBe(20);

    const result2 = c.at(-1);

    expect(result2).toBe(30);

})})

describe('fill', () => { it('should fill Curri with an item at given indexes', () =>{
    const c = new Curri(10, 20, 30);

    const result = c.fill(1,1,3);

    expect(c).toBeInstanceOf(Curri);
    expect(result).toEqual(new Curri(10,1,1));

})})

})