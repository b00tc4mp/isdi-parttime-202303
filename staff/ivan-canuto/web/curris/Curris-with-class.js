export class Curri {
  constructor() {
    this.length = 0
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
      this.length = arguments[0]
    } else {
      for (let i = 0; i < arguments.length; i++) {
        this[i] = arguments[i]
        this.length++
      }
    }
  }
  
  static of() {
    const c = new Curri
    for (let i = 0; i < arguments.length; i++) {
      c[i] = arguments[i]
      c.length++
    }
    return c
  }
  
  forEach(callback) {
    for(let i = 0; i < this.length; i++) {
      let element = this[i]
      
      callback(element, i, this)
    }
  }
  
  map(callback) {
    const mapped = new Curri
  
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      mapped[mapped.length] = callback(element)
      mapped.length++
    }
    return mapped
  }
  
  at(index) {
    if(isNaN(index)) throw new Error('The value entered is not a number.')
    let negativeNubmer = false
    let temporaryIndex = String(index)
    if(temporaryIndex.includes('-')){
      negativeNubmer = true
      temporaryIndex = Number(temporaryIndex.slice(1))
    }
    
    let value;
    if(!negativeNubmer) {
      for (let i = 0; i < this.length; i++) {
        if (i === index) {
          value = this[i]
          return value;
        }
      }
      if(value === undefined) return console.log('There is not number at that position.');
    }
    if (negativeNubmer) {
      let newArr = []
      for (let i = this.length - 1; i >= 0; i--) {
        newArr[newArr.length] = this[i]
      }
      for (let i = 0; i < newArr.length; i++) {
        if (i === temporaryIndex - 1) {
          value = newArr[i]
          return value
        }
      }
      if(value === undefined) return console.log('There is not number at that position.');
    }
  }
  
  concat(...elements) {
    const concatenated = new Curri
    for (let i = 0; i < this.length; i++) {
      concatenated[i] = this[i]
      concatenated.length++
    }
    for(let i = 0; i < elements.length; i++) {
      concatenated[concatenated.length] = elements[i]
      concatenated.length++
    }
    return concatenated
  }
  
  every(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if(!callback(element)) return false
    }
    return true
  }
  
  fill(element, start = 0, end = this.length-1) {
    if (end >= this.length) end = this.length - 1
    for (let i = start; i < end; i++) {
      this[i] = element
    }
  }
  
  filter(callback) {
    const filtered = new Curri
    for(let i = 0; i < this.length; i++) {
      const element = this[i]
      if(callback(element)) {
        filtered[filtered.length] = element
        filtered.length++
      } 
    }
    return filtered
  }
  
  find(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if (callback(element)) return element
    }
    return undefined
  }
  
  findIndex(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if(callback(element)) return i
    }
    return -1
  }
  
  includes(item) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if (item === element) return true
    }
    return false
  }
  
  indexOf(item) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if (item === element) return i
    }
    return -1
  }
  
  join(item) {
    let string = ''
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      string += element
      if (element !== this[this.length-1]) string += item
    }
    return string
  }
  
  lastIndexOf(item) {
    let index;
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if (item === element) index = i
    }
    if(index === undefined) index = -1
    return index
  }
  
  reduce(callback, initialValue) {
    let accumulator;
    if (initialValue === undefined) {
      accumulator = this[0]
      for (let i = 1; i < this.length; i++) {
        const element = this[i]
        accumulator = callback(accumulator, element)
      }
      return accumulator
    }
    accumulator = initialValue
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      accumulator = callback(accumulator, element)
    }
    return accumulator
  }
  
  reverse() {
    let reversed = new Curri
    for (let i = this.length -1; i >= 0; i--) {
      const element = this[i]
      reversed[reversed.length] = element
      reversed.length++
    }
    for (let i = 0; i < this.length; i++) {
      this[i] = reversed[i]
    }
    return reversed
  }
  
  shift() {
    let firstElement = this[0]
    for (let i = 0; i < this.length; i++) {
      this[i] = this[i+1]
    }
    delete this[this.length-1]
    this.length--
    return firstElement
  }
  
  slice(start = 0, end = this.length) {
    const sliced = new Curri
    if (end >= this.length) end = this.length
    for (let i = start; i < end; i++) {
      sliced[sliced.length] = this[i]
      sliced.length++
    }
    return sliced
  }
  
  some(callback) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      if(callback(element)) return true
    }
    return false
  }
  
  splice(start, deleteCount, ...elements) {
    
    if(deleteCount > this.length - start) deleteCount = this.length - start
  
    let numbersExtracted = new Curri
    
    for(let i = start; i < start + deleteCount; i++) {
      numbersExtracted[numbersExtracted.length] = this[i]
      numbersExtracted.length++
    }
    for(let i = start; i < this.length - deleteCount; i++) {
      this[i] = this[i + deleteCount]
    }
    for(let i = 0; i < deleteCount; i++) {
      delete this[this.length - 1]
      this.length--
    }
    
    // Añadir elementos
    this.length += elements.length
    // for(let i = 0; i < elements.length; i++) {
    //   this.length++
    // }
    for(let i = this.length - 1; i >= start + elements.length; i--) {
      this[i] = this[i - elements.length]
    }
    for(let i = 0; i <elements.length; i++) {
      this[start + i] = elements[i]
    }
    return numbersExtracted
  }
  
  toReversed() {
    let toReversed = new Curri
    for (let i = this.length -1; i >= 0; i--) {
      const element = this[i]
      toReversed[toReversed.length] = element
      toReversed.length++
    }
    return toReversed
  }
  
  unshift(...elements) {
    this.length += elements.length
  
    for(let i = this.length-1; i >= 0; i--) {
      this[i] = this[i-elements.length]
    }
    for(let j = 0; j < elements.length; j++) {
      this[j] = elements[j]
    }
    return this.length
  }
  
}
export default Curri