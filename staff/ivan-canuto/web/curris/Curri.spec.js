import Curri from './Curris.js'

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

    it('should create a new instance with the length specified in the given numeric elementh', () => {
      const c = new Curri(10)
      
      expect(c.length).toBe(10)
    })
    
    it('should create a new instance with the length of 1 and the element given in the first position', () => {
      const c = new Curri(true)
      
      expect(c.length).toBe(1)
      expect(c[0]).toBe(true)
    })
  })

  describe('forEach', () => {
    it('should iterate over a collection of elements with the given callback function', ()=> {
      const c = new Curri

      c[0]= 'Hola'
      c[1]= 'Adiós'
      c[2] = 'Saludos'
      c.length += 3

      const a = []

      c.forEach((elem, i) => a[i] = elem)
      expect(a.length).toBe(3)
      expect(a[0]).toBe('Hola')
      expect(a[1]).toBe('Adiós')
      expect(a[2]).toBe('Saludos')
    })
  })

  describe('map', () => {
    it('should iterate a collection of elements and return a new collection with the given callback function', () => {
      const c = new Curri

      c[0]= 'Hola'
      c[1]= 'Adiós'
      c[2] = 'Saludos'
      c.length += 3
      
      let a = c.map((elem) => elem.toUpperCase())
      expect(a.length).toBe(3)
      expect(a[0]).toBe('HOLA')
      expect(a[1]).toBe('ADIÓS')
      expect(a[2]).toBe('SALUDOS')  
    })
  })

  describe('at', () => {
    it('should return the element at the postion specified', () => {
      const c = new Curri

      c[0]= 2
      c[1] = 10
      c[2]= 5
      c[3]= 3
      c[4] = 19
      c[5]= 51
      c.length += 6

      let index1 = 4
      let a = c.at(index1)
      expect(c.length).toBe(6)
      expect(typeof index1).toBe('number')
      expect(a).toBe(19)
      
      let index2 = -1
      let b = c.at(index2)
      expect(typeof index2).toBe('number')
      expect(b).toBe(51)
    })
  })

  describe('concat', () => {
    it('should concatenate the elements in the current curri with the elements entered', () => {
      const c = new Curri

      c[0]= 'Hola'
      c[1]= 'Adiós'
      c[2] = 'Saludos'
      c.length += 3
      
      let a = c.concat('Adeu', 'Ciao', 'Fins altra')
      expect(a.length).toBe(6)
      expect(a[3]).toBe('Adeu')
      expect(a[4]).toBe('Ciao')
      expect(a[5]).toBe('Fins altra')
    })
  })

  describe('every', () => {
    it('should iterate a collection of elements and check if each element meets the condition in the callback function', () => {
      const c = new Curri

      c[0]= 2
      c[1] = 10
      c[2]= 5
      c[3]= 3
      c[4] = 19
      c[5]= 51
      c.length += 6

      let a = c.every(elem => typeof elem === 'number')
      expect(c.length).toBe(6)
      expect(a).toBe(true)
    })
  })

  describe('fill', () => {
    it('should modify the given collection of elements with the specified number and at the specified positions', () => {
      const c = new Curri
      
      c[0]= 2
      c[1] = 10
      c[2]= 5
      c[3]= 3
      c[4] = 19
      c[5]= 51
      c.length += 6

      c.fill(0, 1, 4)
      expect(c[0]).toBe(2)
      expect(c[1]).toBe(0)
      expect(c[2]).toBe(0)
      expect(c[3]).toBe(0)
      expect(c[4]).toBe(19)
      expect(c[5]).toBe(51)
    })
  })

  describe('filter', () => {
    it('should filter the elements of a given collection that meet the condition in the given function', () => {
      const c = new Curri
      
      c[0]= 2
      c[1] = 10
      c[2]= 5
      c[3]= 3
      c[4] = 19
      c[5]= 51
      c.length += 6

      let a = c.filter(elem => elem >= 10)
      expect(a[0]).toBe(10)
      expect(a[1]).toBe(19)
      expect(a[2]).toBe(51)
    })
  })

  describe('find', () => {
    const c = new Curri
    
    c[0]= 2
    c[1]= 5
    c[2] = 11
    c[3]= 3
    c[4] = 19
    c[5]= 51
    c.length += 6

    it('should return the first element of a given collection that satisfies the testing function', () => {
      let a = c.find(elem => elem > 10)
      expect(a).toBe(11)
    })
    
    it('should return undefined if does not satisfies the thesting function', () => {
      let b = c.find(elem => elem > 100)
      expect(b).toBe(undefined)
    })
  })

  describe('findIndex', () => {
    const c = new Curri
    
    c[0]= 2
    c[1]= 5
    c[2] = 11
    c[3]= 3
    c[4] = 19
    c[5]= 51
    c.length += 6

    it('should return the index of the first element of a given collection that satisfies the testing function', () => {
      let a = c.findIndex(elem => elem > 10)
      expect(a).toBe(2)
    })
    
    it('should return -1 if there is no element that satisfies the testing function', () => {
      let b = c.findIndex(elem => elem > 100)
      expect(b).toBe(-1)
    })
  })

  describe('includes', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c[4] = 'Adiós'
    c[5]= 'Arrivederci'
    c.length += 6

    it('should check if the if the given element exists in the existing collection, if not "undefined" is returned', () => {
      let a = c.includes('Adiós')
      expect(a).toBe(true)
    })
    
    it('should return false if the elment does not exist in the given collection', () => {
      let b = c.includes('Fins després')
      expect(b).toBe(false)
    })
  })

  describe('indexOf', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c[4] = 'Adiós'
    c[5]= 'Arrivederci'
    c.length += 6

    it('should return the index of the entered element in a existing collection, if not -1 is returned', () => {
      let a = c.indexOf('Arrivederci')
      expect(a).toBe(5)
    })
    
    it('should return -1 if the given element does not exist in the existing collection', () => {
      let b = c.indexOf('Fins altra')
      expect(b).toBe(-1)
    })
  })

  describe('join', () => {
    it('should create a string puting together the elements of a collection using a given item', () => {
      const c = new Curri
      
      c[0]= 'Hola'
      c[1] = 'Buenos'
      c[2]= 'Dias'
      c.length += 3

      let a = c.join(' - ')
      expect(a).toBe('Hola - Buenos - Dias')
    })
  })

  describe('lastIndexOf', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c[4] = 'Adeu'
    c[5]= 'Arrivederci'
    c.length += 6

    it('should return the index of the the last postition where you can find the given element in a existing collection', () => {
      let a = c.lastIndexOf('Adeu')
      expect(a).toBe(4)
    })

    it('should return -1 if the given element does not exist in the collection', () => {
      let a = c.lastIndexOf('Hasta otra')
      expect(a).toBe(-1)
    })
  })

  describe('reduce', () => {
    const c = new Curri
    
    c[0]= 11
    c[1] = 12
    c[2]= 13
    c[3]= 14
    c[4] = 15
    c[5]= 16
    c.length += 6

    it('should return the accumulated value of a testing functiom that operates with all the elements in a given collection', () => {
      const add = (a, b) => a + b
      let result = c.reduce(add)
      expect(result).toBe(81)
    })
  })

  describe('reverse', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c.length += 4

    it('should return the current collection reversed', () => {
      c.reverse()
      expect(c[0]).toBe('Good bye')
      expect(c[1]).toBe('Hasta luego')
      expect(c[2]).toBe('Adeu')
      expect(c[3]).toBe('Hola')
    })
  })

  describe('shift', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c.length += 4
    let firstElement = c.shift()

    it('should remove the first element of a given collection', () => {
      expect(c).toEqual(new Curri('Adeu', 'Hasta luego', 'Good bye'))
    })

    it('should return the first element removed from the given collection', () => {
      expect(firstElement).toBe('Hola')
    })
  })
  
  describe('slice', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adeu'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c[4] = 'Ciao'
    c[5]= 'Arrivederci'
    c.length += 6

    it('should return the a copy of the entire collection if no start index and no end index are given', () => {
      let sliced = c.slice()
      expect(sliced).toEqual(new Curri('Hola', 'Adeu', 'Hasta luego', 'Good bye', 'Ciao', 'Arrivederci'))
    })
    
    it('Should return a copy of the existing collection from the given start index to the end if no end index is given', () => {
      let sliced = c.slice(1)
      expect(sliced).toEqual(new Curri('Adeu', 'Hasta luego', 'Good bye', 'Ciao', 'Arrivederci'))
    })

    it('should return a portion of the given collection', () => {
      let sliced = c.slice(1, 5)
      expect(sliced).toEqual(new Curri('Adeu', 'Hasta luego', 'Good bye', 'Ciao'))
    })
  })

  describe('some', () => {
    const c = new Curri
    
    c[0]= 'Hola'
    c[1] = 'Adiós'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c[4] = 'Ciao'
    c[5]= 'Arrivederci'
    c.length += 6

    it('should check if at least one element of the given collection satisfies the testing function', () => {
      let a = c.some(elem => elem.length === 5)
      expect(a).toBe(true)
    })

    it('sould return false if no element satisfies the testing function', () => {
      let a = c.some(elem => elem.length === 6)
      expect(a).toBe(false)
    })
  })

  describe('splice', () => {
    it('should remove the quantity of elements specified ind the second parameter form the start index specified in the firs parameter given', () => {
      const c = new Curri
  
      c[0]= 'Hola'
      c[1] = 'Adiós'
      c[2]= 'Hasta luego'
      c[3]= 'Good bye'
      c[4] = 'Ciao'
      c[5]= 'Arrivederci'
      c.length += 6

      c.splice(2, 2)
      expect(c).toEqual(new Curri('Hola', 'Adiós', 'Ciao', 'Arrivederci'))
      expect(c.length).toBe(4)
    })
    
    it('should remove the amount of elements specified and add all the ones entered after the deleteCount number', () => {
      const c = new Curri
  
      c[0]= 'Hola'
      c[1] = 'Adiós'
      c[2]= 'Hasta luego'
      c[3]= 'Good bye'
      c[4] = 'Ciao'
      c[5]= 'Arrivederci'
      c.length += 6

      c.splice(4, 0 , 'Com va?', 'Adeu')
      expect(c).toEqual(new Curri('Hola', 'Adiós', 'Hasta luego', 'Good bye', 'Com va?', 'Adeu', 'Ciao', 'Arrivederci'))
      expect(c.length).toBe(8)
    })
  })

  describe('toReversed', () => {
    const c = new Curri
  
    c[0]= 'Hola'
    c[1] = 'Adiós'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c.length += 4

    it('should create a copy of the given element collection with the position of this elements reversed, without modifying the order of the original collection', () => {
      let reversed = c.toReversed()
      expect(reversed).toEqual(new Curri('Good bye', 'Hasta luego', 'Adiós', 'Hola'))
      expect(c).toEqual(new Curri('Hola', 'Adiós', 'Hasta luego', 'Good bye'))
    })
  })

  describe('unshift', () => {
    const c = new Curri
  
    c[0]= 'Hola'
    c[1] = 'Adiós'
    c[2]= 'Hasta luego'
    c[3]= 'Good bye'
    c.length += 4

    it('should add the entered elements at the beginning of the given collection', () => {
      c.unshift('Bon dia!', 'Que tal?')
      expect(c).toEqual(new Curri('Bon dia!', 'Que tal?', 'Hola', 'Adiós', 'Hasta luego', 'Good bye'))
      expect(c.length).toBe(6)
    })
  })
})

