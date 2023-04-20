console.log('%cTesta%crossa %cv0', 'color: green;', 'color: red;', 'font-size: 8px;')

function describe(description, callback) {
    console.log(`%c${description}`, 'color: green;')

    callback()
}

function it(description, callback) {
    try {
        callback()

        console.log(`%c• ${description}`, 'color: green;')
    } catch(error) {
        console.log(`%c• ${description}\n${error.stack}`, 'color: tomato;')
    }
}

function expect(value) {
    return {
        toBe(expectedValue) {
            if (value !== expectedValue) throw new Error(`Expected ${value} to be ${expectedValue}`)
        },

        toBeInstanceOf(expectedValue) {
            if (!(value instanceof expectedValue)) throw new Error(`Expected instance of ${value.constructor.name} to be an instance of ${expectedValue.name}`)
        }
    }
}