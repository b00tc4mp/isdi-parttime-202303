function init() {
    const a = 10
    const b = 20
    const c = 30
    
    return {
        a,
        b,
        c
    }
}

/*
const things = init()
const a = things.a
const b = things.b
const c = things.c
*/
const { a, b, c } = init()

console.log(a, b, c)

