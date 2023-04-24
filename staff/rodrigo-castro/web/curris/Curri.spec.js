import Curri from './Curri.js'

describe('Curri', () => {
    describe('constructor', () => {
        it('should create a new instance with length 0 by default', () => {
            const c = new Curri

            expect(c).toBeInstanceOf(Curri)
            expect(c).toHaveSize(0)
        })

        it('should create a new instance with the given elements', () => {
            const c = new Curri(10, 20, 30)
      
            expect(c).toBeInstanceOf(Curri)
            expect(c).toHaveSize(3)
            expect(c[0]).toBe(10)
            expect(c[1]).toBe(20)
            expect(c[2]).toBe(30)
          })

          it('should create a new instance with as many empty slots as the argument indicates, and a length equal to that number', () => {
            const c = new Curri(10)

            expect(c).toBeInstanceOf(Curri)
            expect(c).toHaveSize(10)
          })

          it('should create a new instance with a length equal to 1 and an element equal to the argument value', () => {
            const c = new Curri(true)

            expect(c).toBeInstanceOf(Curri)
            expect(c).toHaveSize(1)
            expect(c[0]).toBe(true)
          })
    })

    describe('for each', () => {
      it('should execute a provided function once for each element of the Curri', () => {
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
      it('should iterate through all the array, apply the callback on every element and return the new array', () => {
        const c = new Curri
    
        c[0] = 'A'
        c.length++
        c[1] = 'B'
        c.length++
        c[2] = 'C'
        c.length++

        const c2 = c.map(elem => elem.toLowerCase())

        expect(c2).toBeInstanceOf(Curri)
        expect(c2).toHaveSize(3)
        expect(c2[0]).toBe('a')
        expect(c2[1]).toBe('b')
        expect(c2[2]).toBe('c')
      })
    })

    describe('at', () => {
      it('should return the element located in the given position', () => {
        const c = new Curri
    
        c[0] = 'A'
        c.length++
        c[1] = 'B'
        c.length++
        c[2] = 'C'
        c.length++

        const a1 = c.at(2)
        const a2 = c.at(5)
        const a3 = c.at(-2)
        const a4 = c.at()

        expect(c).toBeInstanceOf(Curri)
        expect(c).toHaveSize(3)
        expect(a1).toBe('C')
        expect(a2).toBe(undefined)
        expect(a3).toBe('B')
        expect(a4).toBe('A')
      })
    })

    describe('concat', () => {
      it('should concatenate the elements given one after the other in the given order', () => {

        const c = new Curri
        
        c[0] = 'A'
        c.length++
        c[1] = 'B'
        c.length++
        c[2] = 'C'
        c.length++

        const d = new Curri
        d[0] = 'd'
        d.length++
        d[1] = 'e'
        d.length++

        const e = new Curri
        e[0] = 'F'
        e.length++
        e[1] = 'G'
        e.length++
        e[2] = 'H'
        e.length++
        e[3] = 'I'
        e.length++

        const a1 = c.concat(d, e)

        expect(c).toBeInstanceOf(Curri)
        expect(c).toHaveSize(3)
        expect(d).toBeInstanceOf(Curri)
        expect(d).toHaveSize(2)
        expect(e).toBeInstanceOf(Curri)
        expect(e).toHaveSize(4)
        expect(a1).toBeInstanceOf(Curri)
        expect(a1).toHaveSize(9)
        expect(a1[7]).toBe('H')

      })
    })

    describe('every', () => {
      it('should iterate on every element of the Curri and evaluate a condition given on a callback', () => {
        const array1 = new Curri
        array1[0] = 1
        array1.length++
        array1[1] = 30
        array1.length++
        array1[2] = 39
        array1.length++
        array1[3] = 29
        array1.length++
        array1[4] = 10
        array1.length++
        array1[5] = 13
        array1.length++
        array1[6] = 42
        array1.length++

        const b1 = array1.every(element => element < 15)
        const b2 = array1.every(element => element < 150)
        // const b3 = array1.every() ---> TODO: IMPLEMENT ERORR !!!


        expect(array1).toBeInstanceOf(Curri)
        expect(array1).toHaveSize(7)
        expect(b1).toBe(false)
        expect(b2).toBe(true)
      })
    })

    describe('fill', () => {
      it('should fill with the first parameter from position indicated in the second parameter until position indicated in the third parameter', () => {
        const array2 = new Curri
        array2[0] = 1
        array2.length++
        array2[1] = 2
        array2.length++
        array2[2] = 3
        array2.length++
        array2[3] = 4
        array2.length++
        
        array2.fill(0, -2, 4)
        
        expect(array2).toBeInstanceOf(Curri)
        expect(array2).toHaveSize(4)
        expect(array2[1]).toBe(2)
        expect(array2[2]).toBe(0)
        expect(array2[3]).toBe(0)

        })

        it('should fill with the first parameter from position indicated in the second parameter until the end', () => {
          const array2 = new Curri
          array2[0] = 1
          array2.length++
          array2[1] = 2
          array2.length++
          array2[2] = 3
          array2.length++
          array2[3] = 4
          array2.length++
          
          array2.fill(5, 1)
          
          expect(array2).toBeInstanceOf(Curri)
          expect(array2).toHaveSize(4)
          expect(array2[0]).toBe(1)
          expect(array2[1]).toBe(5)
          expect(array2[2]).toBe(5)
          expect(array2[3]).toBe(5)

          })

          it('should fill all the array with the given parameter', () => {
            const array2 = new Curri
            array2[0] = 1
            array2.length++
            array2[1] = 2
            array2.length++
            array2[2] = 3
            array2.length++
            array2[3] = 4
            array2.length++
            
            array2.fill(6)

            expect(array2).toBeInstanceOf(Curri)
            expect(array2).toHaveSize(4)
            expect(array2[0]).toBe(6)
            expect(array2[1]).toBe(6)
            expect(array2[2]).toBe(6)
            expect(array2[3]).toBe(6)
            })

    })

    describe('filter', () => {
      it('should filter a Curri according to the given callback', () => {
        const array3 = new Curri
        array3[0] = -3
        array3.length++
        array3[1] = -2
        array3.length++
        array3[2] = -1
        array3.length++
        array3[3] = 0
        array3.length++
        array3[4] = 1
        array3.length++
        array3[5] = 2
        array3.length++
        array3[6] = 3
        array3.length++
        array3[7] = 4
        array3.length++
        array3[8] = 5
        array3.length++
        array3[9] = 6
        array3.length++
        array3[10] = 7
        array3.length++
        array3[11] = 8
        array3.length++
        array3[12] = 9
        array3.length++
        array3[13] = 10
        array3.length++
        array3[14] = 11
        array3.length++
        array3[15] = 12
        array3.length++
        array3[16] = 13
        array3.length++
        
        const array4 = array3.filter((num) => {
          for (let i = 2; num > i; i++) {
            if (num % i === 0) {
              return false;
            }
          }
          return num > 1;
        })

        const array5 = array3.filter(num => num < 50)

        const array6 = array3.filter(num => num > 50)

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(6)
        expect(array4[0]).toBe(2)
        expect(array4[1]).toBe(3)
        expect(array4[2]).toBe(5)
        expect(array4[3]).toBe(7)
        expect(array4[4]).toBe(11)
        expect(array4[5]).toBe(13)

        expect(array5).toBeInstanceOf(Curri)
        expect(array5).toHaveSize(17)
        
        expect(array6).toBeInstanceOf(Curri)
        expect(array6).toHaveSize(0)
      })
    })

    describe('find', () => {
      it('should find the first element of the Curri that satisfies the condition given in the callback', () => {
        const array4 = new Curri
        array4[0] = 15
        array4.length++
        array4[1] = 7
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++
        
        const found1 = array4.find((element) => element < 8)
        const found2 = array4.find(element => element < 2)
        const found3 = array4.find(element => element > 0)

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        expect(found1).toBe(7)
        expect(found2).toBe(undefined)
        expect(found3).toBe(15)

      })
    })

    describe('find index', () => {
      it('should find the index of the first element of the Curri that satisfies the condition given in the callback', () => {
        const array4 = new Curri
        array4[0] = 6
        array4.length++
        array4[1] = 7
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++
      
        const found1 = array4.findIndex(element => element > 1022)
        const found2 = array4.findIndex(element => element > 7)
        const found3 = array4.findIndex(element => element > 0)

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        expect(found1).toBe(-1)
        expect(found2).toBe(2)
        expect(found3).toBe(0)
      })
    })

    describe('includes', () => {
      it('should iterate all the array and evaluate if a given value is included or not', () => {
        const array4 = new Curri
        array4[0] = 15
        array4.length++
        array4[1] = 7
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++

        const included1 = array4.includes(130)
        const included2 = array4.includes(20)
        const included3 = array4.includes()

        array4[5] = undefined
        array4.length++

        const included4 = array4.includes()

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(6)
        expect(included1).toBe(true)
        expect(included2).toBe(false)
        expect(included3).toBe(false)
        expect(included4).toBe(true)
      })
    })

    describe('index of', () => {
      it('should return the index in the Curri of the given element', () => {
        const array4 = new Curri
        array4[0] = 15
        array4.length++
        array4[1] = 7
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++
        
        const found1 = array4.indexOf(44)
        const found2 = array4.indexOf(20)
        const found3 = array4.indexOf(7, 2)

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        expect(found1).toBe(4)
        expect(found2).toBe(-1)
        expect(found3).toBe(-1)

      })
    })

    describe('join', () => {
      it('should return a string with all the parameters of the Curri separated by the given joiner', () => {
        const array4 = new Curri
        array4[0] = 15
        array4.length++
        array4[1] = 7
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++

        const result1 = array4.join('-')
        const result2 = array4.join()
        const result3 = array4.join('')

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        expect(result1).toBe('15-7-8-130-44')
        expect(result2).toBe('15,7,8,130,44')
        expect(result3).toBe('157813044')
      })
    })

    describe('last index of', () => {
      it('should return the last index at which a given element can be found in the array', () => {
        const array4 = new Curri
        array4[0] = 15
        array4.length++
        array4[1] = 44
        array4.length++
        array4[2] = 8
        array4.length++
        array4[3] = 130
        array4.length++
        array4[4] = 44
        array4.length++
        
        const result1 = array4.lastIndexOf(44)
        const result2 = array4.lastIndexOf(444)
        const result3 = array4.lastIndexOf()

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        // expect(result1).toBeInstanceOf(Number)
        expect(result1).toBe(4)
        // expect(result2).toBeInstanceOf(Number)
        expect(result2).toBe(-1)
        // expect(result3).toBeInstanceOf(Number)
        expect(result3).toBe(-1)
      })
    })

    describe('reduce', () => {
      it('should execute the reducer given callback, passing in the return value from the calculation on the preceding element, and returning a single value at the end', () => {
        const array6 = new Curri
    
        array6[0] = 1
        array6.length++
        array6[1] = 2
        array6.length++
        array6[2] = 3
        array6.length++
        array6[3] = 4
        array6.length++
        
        const reduced1 = array6.reduce((element, accum) => accum = accum + element)

        const array7 = new Curri
    
        array7[0] = 'H'
        array7.length++
        array7[1] = 'O'
        array7.length++
        array7[2] = 'L'
        array7.length++
        array7[3] = 'A!!!'
        array7.length++

        const reduced2 = array7.reduce((accum, element) => accum = accum + element)
        const reduced3 = array7.reduce(((accum, element) => accum = accum + element), '¡¡¡')

        expect(array6).toBeInstanceOf(Curri)
        expect(array6).toHaveSize(4)
        expect(reduced1).toBe(10)
        expect(reduced2).toBe('HOLA!!!')
        expect(reduced3).toBe('¡¡¡HOLA!!!')
      })
    })

    describe('reverse', () => {
      it('should turn the given array backwards, turning the first element in the last one and viceversa', () => {
        const array3 = new Curri
        array3[0] = -3
        array3.length++
        array3[1] = -2
        array3.length++
        array3[2] = -1
        array3.length++
        array3[3] = 0
        array3.length++
        array3[4] = 1
        array3.length++
        array3[5] = 2
        array3.length++
        array3[6] = 3
        array3.length++
        array3[7] = 4
        array3.length++
        array3[8] = 5
        array3.length++
        array3[9] = 6
        array3.length++
        array3[10] = 7
        array3.length++
        array3[11] = 8
        array3.length++
        array3[12] = 9
        array3.length++
        array3[13] = 10
        array3.length++
        array3[14] = 11
        array3.length++
        array3[15] = 12
        array3.length++
        array3[16] = 13
        array3.length++
        
        const reversed = array3.reverse()
  
        expect(array3).toBeInstanceOf(Curri)
        expect(array3).toHaveSize(17)
        expect(array3[0]).toBe(13)
        expect(array3[16]).toBe(-3)
        expect(reversed).toBeInstanceOf(Curri)
        expect(reversed).toHaveSize(17)
        expect(reversed[0]).toBe(13)
        expect(reversed[16]).toBe(-3)
      })
    })

    describe('shift', () => {
      it('should remove the first element from an array and return the removed element', () => {
        const array6 = new Curri
    
        array6[0] = 1
        array6.length++
        array6[1] = 2
        array6.length++
        array6[2] = 3
        array6.length++
        array6[3] = 4
        array6.length++
        
        expect(array6).toBeInstanceOf(Curri)
        expect(array6).toHaveSize(4)
        
        const shiftedElement = array6.shift()

        expect(array6).toHaveSize(3)
        // expect(shiftedElement).toBeInstanceOf(Number)
        expect(shiftedElement).toBe(1)
        expect(array6[0]).toBe(2)
        expect(array6[2]).toBe(4)
        expect(array6[3]).toBe(undefined)
      })
    })

    describe('slice', () => {
      it('should return a copy of a portion of the given Curri, without modifying the original Curri', () => {
        const animals = new Curri 
        animals[0] = 'ant'
        animals.length++
        animals[1] = 'bison'
        animals.length++
        animals[2] = 'camel'
        animals.length++
        animals[3] = 'duck'
        animals.length++
        animals[4] = 'elephant'
        animals.length++
        
        const slice1 = animals.slice(2)
        // Expected output: Array ["camel", "duck", "elephant"]
        
        const slice2 = animals.slice(2, 4)
        // Expected output: Array ["camel", "duck"]
        
        const slice3 = animals.slice(1, 10)
        // Expected output: Array ["bison", "camel", "duck", "elephant"]
        
        const slice4 = animals.slice(-2)
        // Expected output: Array ["duck", "elephant"]
        
        const slice5 = animals.slice(2, -1)
        // Expected output: Array ["camel", "duck"]
        
        const slice6 = animals.slice(-4, -2)
        // Expected output: Array ["bison", "camel"]
        
        const slice7 = animals.slice(-15, -12)
        
        const slice8 = animals.slice(-2, -3)
        
        const slice9 = animals.slice(3, 2)
        
        const slice10 = animals.slice()
        // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice1).toBeInstanceOf(Curri)
        expect(slice1).toHaveSize(3)
        expect(slice1[0]).toBe('camel')
        expect(slice1[2]).toBe('elephant')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice2).toBeInstanceOf(Curri)
        expect(slice2).toHaveSize(2)
        expect(slice2[0]).toBe('camel')
        expect(slice2[1]).toBe('duck')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice3).toBeInstanceOf(Curri)
        expect(slice3).toHaveSize(4)
        expect(slice3[0]).toBe('bison')
        expect(slice3[3]).toBe('elephant')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice4).toBeInstanceOf(Curri)
        expect(slice4).toHaveSize(2)
        expect(slice4[0]).toBe('duck')
        expect(slice4[1]).toBe('elephant')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice5).toBeInstanceOf(Curri)
        expect(slice5).toHaveSize(2)
        expect(slice5[0]).toBe('camel')
        expect(slice5[1]).toBe('duck')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice6).toBeInstanceOf(Curri)
        expect(slice6).toHaveSize(2)
        expect(slice6[0]).toBe('bison')
        expect(slice6[1]).toBe('camel')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice7).toBeInstanceOf(Curri)
        expect(slice7).toHaveSize(0)

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice8).toBeInstanceOf(Curri)
        expect(slice8).toHaveSize(0)

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice9).toBeInstanceOf(Curri)
        expect(slice9).toHaveSize(0)

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)

        expect(slice10).toBeInstanceOf(Curri)
        expect(slice10).toHaveSize(5)
        expect(slice10[0]).toBe('ant')
        expect(slice10[4]).toBe('elephant')

        expect(animals).toBeInstanceOf(Curri)
        expect(animals).toHaveSize(5)
      })
    })

    describe('some', () => {
      it('should test whether at least one element of the Curri passes the test given in the callback, returning true or false', () => {
        const array3 = new Curri
        array3[0] = -3
        array3.length++
        array3[1] = -2
        array3.length++
        array3[2] = -1
        array3.length++
        array3[3] = 0
        array3.length++
        array3[4] = 1
        array3.length++
        array3[5] = 2
        array3.length++
        array3[6] = 3
        array3.length++
        array3[7] = 4
        array3.length++
        array3[8] = 5
        array3.length++
        array3[9] = 6
        array3.length++
        array3[10] = 7
        array3.length++
        array3[11] = 8
        array3.length++
        array3[12] = 9
        array3.length++
        array3[13] = undefined
        array3.length++
        array3[14] = 11
        array3.length++
        array3[15] = 12
        array3.length++
        array3[16] = 13
        array3.length++
        
        const some1 = array3.some((element) => element === 9)
        const some2 = array3.some((element) => element === 90)
        const some3 = array3.some((element) => element === undefined)

        expect(array3).toBeInstanceOf(Curri)
        expect(array3).toHaveSize(17)

        expect(some1).toBe(true)
        expect(some2).toBe(false)
        expect(some3).toBe(true)
      })
    })

    describe('to reversed', () => {
      it('should return a new array with the elements in reversed order', () => {
        const array3 = new Curri
        array3[0] = -3
        array3.length++
        array3[1] = -2
        array3.length++
        array3[2] = -1
        array3.length++
        array3[3] = 0
        array3.length++
        array3[4] = 1
        array3.length++
        array3[5] = 2
        array3.length++
        array3[6] = 3
        array3.length++
        array3[7] = 4
        array3.length++
        array3[8] = 5
        array3.length++
        array3[9] = 6
        array3.length++
        array3[10] = 7
        array3.length++
        array3[11] = 8
        array3.length++
        array3[12] = 9
        array3.length++
        array3[13] = 10
        array3.length++
        array3[14] = 11
        array3.length++
        array3[15] = 12
        array3.length++
        array3[16] = 13
        array3.length++
        
        const reversed1 = array3.toReversed()

        expect(array3).toBeInstanceOf(Curri)
        expect(array3).toHaveSize(17)
        expect(array3[0]).toBe(-3)
        expect(array3[16]).toBe(13)
        expect(reversed1).toBeInstanceOf(Curri)
        expect(reversed1).toHaveSize(17)
        expect(reversed1[0]).toBe(13)
        expect(reversed1[16]).toBe(-3)

        const array4 = new Curri
        array4[0] = 'H'
        array4.length++
        array4[1] = 'O'
        array4.length++
        array4[2] = 'L'
        array4.length++
        array4[3] = 'A'
        array4.length++
        array4[4] = '!'
        array4.length++

        const reversed2 = array4.toReversed()

        expect(array4).toBeInstanceOf(Curri)
        expect(array4).toHaveSize(5)
        expect(array4[0]).toBe('H')
        expect(array4[4]).toBe('!')
        expect(reversed2).toBeInstanceOf(Curri)
        expect(reversed2).toHaveSize(5)
        expect(reversed2[0]).toBe('!')
        expect(reversed2[4]).toBe('H')
      })
    })

    describe('unshift', () => {
      it('should add the given elements to the beginning of the Curri, and return the new length of the array', () => {
        const array7 = new Curri
        array7[0] = 15
        array7.length++
        array7[1] = 7
        array7.length++
        array7[2] = 8
        array7.length++
        array7[3] = 130
        array7.length++
        array7[4] = 44
        array7.length++
        
        const array8 = new Curri
        array8[0] = 1
        array8.length++
        array8[1] = 2
        array8.length++
        array8[2] = 3
        array8.length++
        array8[3] = 4
        array8.length++
        
        expect(array7).toBeInstanceOf(Curri)
        expect(array7).toHaveSize(5)
        expect(array8).toBeInstanceOf(Curri)
        expect(array8).toHaveSize(4)
        
        const unshift1 = array7.unshift(array8)
  
        expect(array7).toBeInstanceOf(Curri)
        expect(array7).toHaveSize(9)
        expect(array7[0]).toBe(1)
        expect(array7[3]).toBe(4)
        expect(array7[4]).toBe(15)
        expect(array7[8]).toBe(44)
      })
      
    })

    describe('of', () => {
      it('should create a new Curri instance from a variable number of arguments', () => {
        const c = Curri.of(10, 20, 30)
    
        expect(c).toBeInstanceOf(Curri)
        expect(c).toHaveSize(3)
        expect(c[0]).toBe(10)
        expect(c[1]).toBe(20)
        expect(c[2]).toBe(30)
      })
    })

})
  
  // {
    
  //   const c = new Curri
    
  //   c[0] = 'A'
  //   c.length++
  //   c[1] = 'B'
  //   c.length++
  //   c[2] = 'C'
  //   c.length++
    
    
  //   //console.log(c)
    
  //   //for (var i = 0; i < c.length; i++)
  //   //    console.log(c[i])
  //   console.log('FOREACH METHOD')
  //   c.forEach(elem => console.log(elem))
  //   // 'A'
  //   // 'B'
  //   // 'C'
  
  //   c.forEach((elem, i, c) => console.log(elem, i, c))
  //   // 'A' 0 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3}
  //   // 'B' 1 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3}
  //   // 'C' 2 Curri { 0: 'A', 1: 'B', 2: 'C', length: 3}
  // }
  
  // {
  //   const c = new Curri
    
  //   c[0] = 'A'
  //   c.length++
  //   c[1] = 'B'
  //   c.length++
  //   c[2] = 'C'
  //   c.length++
    
  //   console.log('MAP METHOD')
  //   const c2 = c.map(elem => elem.toLowerCase())
  //   c2.forEach(elem => console.log(elem))
  //   // 'a'
  //   // 'b'
  //   // 'c'
  // }
  
  // {
  //   const c = new Curri
    
  //   c[0] = 'A'
  //   c.length++
  //   c[1] = 'B'
  //   c.length++
  //   c[2] = 'C'
  //   c.length++
    
  //   console.log('AT METHOD')
  //   console.log(c.at(2))
  // }
  
  // {
  //   const c = new Curri
    
  //   c[0] = 'A'
  //   c.length++
  //   c[1] = 'B'
  //   c.length++
  //   c[2] = 'C'
  //   c.length++
    
  //   console.log('CONCAT METHOD')
  //   const d = new Curri
  //   d[0] = 'd'
  //   d.length++
  //   d[1] = 'e'
  //   d.length++
  //   d[2] = 'f'
  //   d.length++
  //   const e = new Curri
  //   e[0] = 'G'
  //   e.length++
  //   e[1] = 'H'
  //   e.length++
  //   e[2] = 'I'
  //   e.length++
  //   console.log(c.concat(d, e))
  // }
  
  // {
  //   console.log('EVERY METHOD')
  //   const array1 = new Curri
  //   array1[0] = 1
  //   array1.length++
  //   array1[1] = 30
  //   array1.length++
  //   array1[2] = 39
  //   array1.length++
  //   array1[3] = 29
  //   array1.length++
  //   array1[4] = 10
  //   array1.length++
  //   array1[5] = 13
  //   array1.length++
  //   array1[6] = 42
  //   array1.length++
  //   console.log(array1.every(element => element < 15))
  // }
  
  // {
  //   console.log('FILL METHOD')
  //   const array2 = new Curri
  //   array2[0] = 1
  //   array2.length++
  //   array2[1] = 2
  //   array2.length++
  //   array2[2] = 3
  //   array2.length++
  //   array2[3] = 4
  //   array2.length++
    
  //   // Fill with 0 from position 2 until position 4
  //   console.log(array2.fill(0, -2, 4))
  //   // Expected output: Array [1, 2, 0, 0]
    
  //   // Fill with 5 from position 1
  //   console.log(array2.fill(5, 1))
  //   // Expected output: Array [1, 5, 5, 5]
    
  //   console.log(array2.fill(6))
  //   // Expected output: Array [6, 6, 6, 6]
  // }
  
  // {
  //   console.log('FILTER METHOD')
  //   const array3 = new Curri
  //   array3[0] = -3
  //   array3.length++
  //   array3[1] = -2
  //   array3.length++
  //   array3[2] = -1
  //   array3.length++
  //   array3[3] = 0
  //   array3.length++
  //   array3[4] = 1
  //   array3.length++
  //   array3[5] = 2
  //   array3.length++
  //   array3[6] = 3
  //   array3.length++
  //   array3[7] = 4
  //   array3.length++
  //   array3[8] = 5
  //   array3.length++
  //   array3[9] = 6
  //   array3.length++
  //   array3[10] = 7
  //   array3.length++
  //   array3[11] = 8
  //   array3.length++
  //   array3[12] = 9
  //   array3.length++
  //   array3[13] = 10
  //   array3.length++
  //   array3[14] = 11
  //   array3.length++
  //   array3[15] = 12
  //   array3.length++
  //   array3[16] = 13
  //   array3.length++
    
    
  //   function isPrime(num) {
  //     for (let i = 2; num > i; i++) {
  //       if (num % i === 0) {
  //         return false;
  //       }
  //     }
  //     return num > 1;
  //   }
    
  //   console.log(array3.filter(isPrime)); // [2, 3, 5, 7, 11, 13]
  // }
  
  // {
  //   console.log('FIND METHOD')
  //   const greaterThanTen = (element) => element > 10
    
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
    
  //   const found = array4.find((element) => element < 8);
  //   console.log(found)
  // }
  
  // {
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
  
  //   console.log('FIND INDEX METHOD')
  //   console.log(array4.findIndex((element) => element > 1022))
  // }
  
  // {
  //   console.log('FOR EACH')
  //   const array5 = new Curri
  //   array5[0] = 'a'
  //   array5.length++
  //   array5[1] = 'b'
  //   array5.length++
  //   array5[3] = 'c'
  //   array5.length++
  //   array5.length++
  
  //   array5.forEach(element => console.log(element))
  // }
  
  // {
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
    
  //   console.log('INCLUDES METHOD')
  //   console.log(array4.includes(130))
  // }
  
  // {
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
    
  //   console.log('INDEX OF METHOD')
  //   console.log(array4.indexOf(44))
  // }
  
  // {
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
    
  //   console.log('JOIN METHOD')
  //   console.log(array4.join('-'))
  // }
  
  // {
  //   const array4 = new Curri
  //   array4[0] = 15
  //   array4.length++
  //   array4[1] = 7
  //   array4.length++
  //   array4[2] = 8
  //   array4.length++
  //   array4[3] = 130
  //   array4.length++
  //   array4[4] = 44
  //   array4.length++
    
  //   console.log('LAST INDEX OF METHOD')
  //   console.log(array4.lastIndexOf(444))
  // }
  
  // {
  //   console.log('REDUCE METHOD')
  //   const array6 = new Curri
    
  //   array6[0] = 1
  //   array6.length++
  //   array6[1] = 2
  //   array6.length++
  //   array6[2] = 3
  //   array6.length++
  //   array6[3] = 4
  //   array6.length++
    
  //   console.warn(array6.reduce((element, accum) => accum = accum + element))
  // }
  
  // {
  //   const array3 = new Curri
  //   array3[0] = -3
  //   array3.length++
  //   array3[1] = -2
  //   array3.length++
  //   array3[2] = -1
  //   array3.length++
  //   array3[3] = 0
  //   array3.length++
  //   array3[4] = 1
  //   array3.length++
  //   array3[5] = 2
  //   array3.length++
  //   array3[6] = 3
  //   array3.length++
  //   array3[7] = 4
  //   array3.length++
  //   array3[8] = 5
  //   array3.length++
  //   array3[9] = 6
  //   array3.length++
  //   array3[10] = 7
  //   array3.length++
  //   array3[11] = 8
  //   array3.length++
  //   array3[12] = 9
  //   array3.length++
  //   array3[13] = 10
  //   array3.length++
  //   array3[14] = 11
  //   array3.length++
  //   array3[15] = 12
  //   array3.length++
  //   array3[16] = 13
  //   array3.length++
    
  //   console.log('REVERSE METHOD')
  //   console.log(array3.reverse())
  // }
  
  // {
  //   const array6 = new Curri
    
  //   array6[0] = 1
  //   array6.length++
  //   array6[1] = 2
  //   array6.length++
  //   array6[2] = 3
  //   array6.length++
  //   array6[3] = 4
  //   array6.length++
    
  //   console.log('SHIFT METHOD')
  //   console.log(array6.shift())
  //   console.log(array6)
  // }
  
  // {
  //   console.log('SLICE METHOD')
  //   const animals = new Curri 
  //   animals[0] = 'ant'
  //   animals.length++
  //   animals[1] = 'bison'
  //   animals.length++
  //   animals[2] = 'camel'
  //   animals.length++
  //   animals[3] = 'duck'
  //   animals.length++
  //   animals[4] = 'elephant'
  //   animals.length++
    
  //   console.log(animals.slice(2));
  //   // Expected output: Array ["camel", "duck", "elephant"]
    
  //   console.log(animals.slice(2, 4));
  //   // Expected output: Array ["camel", "duck"]
    
  //   console.log(animals.slice(1, 10));
  //   // Expected output: Array ["bison", "camel", "duck", "elephant"]
    
  //   console.log(animals.slice(-2));
  //   // Expected output: Array ["duck", "elephant"]
    
  //   console.log(animals.slice(2, -1));
  //   // Expected output: Array ["camel", "duck"]
    
  //   console.log(animals.slice(-4, -2));
  //   // Expected output: Array ["bison", "camel"]
    
  //   console.log(animals.slice(-15, -12));
    
  //   console.log(animals.slice(-2, -3));
    
  //   console.log(animals.slice(3, 2));
    
  //   console.log(animals.slice());
  //   // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
  // }
  
  // {
  //   const array3 = new Curri
  //   array3[0] = -3
  //   array3.length++
  //   array3[1] = -2
  //   array3.length++
  //   array3[2] = -1
  //   array3.length++
  //   array3[3] = 0
  //   array3.length++
  //   array3[4] = 1
  //   array3.length++
  //   array3[5] = 2
  //   array3.length++
  //   array3[6] = 3
  //   array3.length++
  //   array3[7] = 4
  //   array3.length++
  //   array3[8] = 5
  //   array3.length++
  //   array3[9] = 6
  //   array3.length++
  //   array3[10] = 7
  //   array3.length++
  //   array3[11] = 8
  //   array3.length++
  //   array3[12] = 9
  //   array3.length++
  //   array3[13] = 10
  //   array3.length++
  //   array3[14] = 11
  //   array3.length++
  //   array3[15] = 12
  //   array3.length++
  //   array3[16] = 13
  //   array3.length++
    
  //   console.log('SOME METHOD')
  //   console.log(array3.some((element) => element === 9))
  //   console.log(array3.some((element) => element === 90))
  //   console.log(array3.some((element) => element === undefined)) // NO CUMPLE !!!  (debería ser false)
  // }
  
  // {
  //   const array3 = new Curri
  //   array3[0] = -3
  //   array3.length++
  //   array3[1] = -2
  //   array3.length++
  //   array3[2] = -1
  //   array3.length++
  //   array3[3] = 0
  //   array3.length++
  //   array3[4] = 1
  //   array3.length++
  //   array3[5] = 2
  //   array3.length++
  //   array3[6] = 3
  //   array3.length++
  //   array3[7] = 4
  //   array3.length++
  //   array3[8] = 5
  //   array3.length++
  //   array3[9] = 6
  //   array3.length++
  //   array3[10] = 7
  //   array3.length++
  //   array3[11] = 8
  //   array3.length++
  //   array3[12] = 9
  //   array3.length++
  //   array3[13] = 10
  //   array3.length++
  //   array3[14] = 11
  //   array3.length++
  //   array3[15] = 12
  //   array3.length++
  //   array3[16] = 13
  //   array3.length++
    
  //   console.log('TO REVERSED METHOD')
  //   console.log(array3)
  //   console.log(array3.toReversed())
  // }
  
  // {
  //   console.log('UNSHIFT METHOD')
    
  //   const array7 = new Curri
  //   array7[0] = 15
  //   array7.length++
  //   array7[1] = 7
  //   array7.length++
  //   array7[2] = 8
  //   array7.length++
  //   array7[3] = 130
  //   array7.length++
  //   array7[4] = 44
  //   array7.length++
    
  //   const array8 = new Curri
  //   array8[0] = 1
  //   array8.length++
  //   array8[1] = 2
  //   array8.length++
  //   array8[2] = 3
  //   array8.length++
  //   array8[3] = 4
  //   array8.length++
    
  //   console.log(array7)
  //   console.log(array8)
  //   console.log(array7.unshift(array8))
  //   console.log(array7)
  // }
  
  // {
  //   console.log('Curry.of')
  
  //   const c = Curri.of(10, 20, 30)
  
  //   console.log(c)
  //   // Curri { 0: 10, 1: 20, 2: 30, length: 3 }
  // }
  
  // {
  //   console.log('IS CURRI METHOD')
  //   const k = new Curri
    
  //   k[0] = 'A'
  //   k.length++
  //   k[1] = 'B'
  //   k.length++
  //   k[2] = 'C'
  //   k.length++
    
  //   console.log(isCurri(k))
  // }