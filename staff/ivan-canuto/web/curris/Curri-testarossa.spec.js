import Curri from "./Curris-with-class.js";
import { describe, it, expect } from "./Testarossa.js";

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
})
