const createCalc = (() => {
    const version = 'CALC v1'
    // ...

    return name => {
        let _name_ = name
    
        const add = (a, b) => `[${version}] ${_name_}: ${a + b}`
    
        const sub = (a, b) => `[${version}] ${_name_}: ${a - b}`
    
        const mul = (a, b) => `[${version}] ${_name_}: ${a * b}`
    
        const div = (a, b) => `[${version}] ${_name_}: ${a / b}`
    
        return { add, sub, mul, div }
    }
})()

const c1 = createCalc('c1')
const c2 = createCalc('c2')

console.log(c1.add(1, 2))
console.log(c2.div(1, 2))
// VM5830:23 [CALC v1] c1: 3
// VM5830:24 [CALC v1] c2: 0.5
// undefined