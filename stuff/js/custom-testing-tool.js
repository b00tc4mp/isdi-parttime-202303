describe('salute', () => {
    describe('latin', () => {
        it('holaMundo', () => {
            expect(!true).toBe(true)
            //expect(salute.holaMundo()).toBe('Hola, Mundo!')
        })

        it('ciaoMondo', () => {
            expect(true).toBe(true)
            //expect(salute.ciaoMondo()).toBe('Ciao, Mondo!')
        })
    })

    describe('saxofon', () => {
        it('helloWorld', () => {
            //expect(salute.helloWorld()).toBe('Hello, World!')
        })
    })
})


function describe(description, callback) {
    console.log(`%c${description}`, 'color: green;')

    callback()
}

function it(description, callback) {
    

    try {
        callback()

        console.log(`%c• ${description}`, 'color: green;')
    } catch(error) {
        console.log(`%c• ${description} ${error.stack}`, 'color: tomato;')
    }
}

function expect(value) {
    return {
        toBe(expectedValue) {
            if (value !== expectedValue) throw new Error(`Expected ${value} to be ${expectedValue}`)
        }
    }
}
// VM1854:23 salute
// VM1854:23 latin
// VM1854:36 • holaMundo Error: Expected false to be true    at Object.toBe (<anonymous>:43:48)    at <anonymous>:4:27    at it (<anonymous>:32:9)    at <anonymous>:3:9    at describe (<anonymous>:25:5)    at <anonymous>:2:5    at describe (<anonymous>:25:5)    at <anonymous>:1:1
// VM1854:34 • ciaoMondo
// VM1854:23 saxofon
// VM1854:34 • helloWorld
// undefined