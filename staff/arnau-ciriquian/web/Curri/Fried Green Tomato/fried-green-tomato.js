export const objectsList = []
export const methodsList = []
let lastItem
console.log(`Fried%cGreen%cTomato %cv0.1`, 'color: green', 'color:tomato', 'font-size: 8px')

export function describe (description, callback) {
    const result = description

    if (!lastItem) {
        objectsList.push(result)
        lastItem = 'describe'
    } else if (lastItem === 'describe') {
        methodsList.push(result)
        lastItem = 'describe'
    }

    console.log(`%c${description}`, 'color: green')

    callback()
}

export function it (description, callback) {
    try {
        callback()
        
        console.log(`%c· ${description}`, 'color: green')
    } catch(error) {
        console.log(`%c· ${description}\n${error.stack}`, 'color: tomato')
    }

}

export function expect (value) {
    return {
        toBe(expectedValue) {
            if (value !== expectedValue) throw new Error(`Expected ${value} to be ${expectedValue}`)
        }, 

        toBeInstanceOf(expectedValue) {
            if (!(value instanceof expectedValue)) throw new Error(`Expected instance of ${value.constructor.name} to be an instance of ${expectedValue.name}`)
        }
    }
}