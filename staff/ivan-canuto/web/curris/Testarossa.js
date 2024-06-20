console.log('%cTesta%crossa %cv0', 'color:green', 'color:red', 'font-size');

export function describe(description, callback) {
  console.log(`%c${description}`, 'color:green');

  callback()
}

export function it(description, callback) {
  try {

    callback()
    
    console.log(`%c• ${description}`, 'color:green');
  } catch (error) {
    console.log(`%c• ${description}/n${error.stack}`, 'color:tomato');
  }
}

export function expect(value) {
  return {
    toBe(expectedValue) {
      if(value !== expectedValue) throw new Error(`Expected ${value} to be ${expectedValue}`)
    },
    toBeInstanceOf(expectedValue) {
      if(!(value instanceof expectedValue)) throw new Error(`Expected ${value.constructor.name} to be instance of ${expectedValue.name}`)
    }
  }
}