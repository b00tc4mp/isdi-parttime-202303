// 0

function x() { throw new Error(':P') }

try {
    x()
} catch(error) {
    console.log(error.message)
}
// VM4192:6 :P

// 1

function x() { setTimeout(() => { throw new Error(':P') }, 1000) }

try {
    x()
} catch(error) {
    console.log(error.message)
}
undefined
// VM4313:1 Uncaught Error: :P
//     at <anonymous>:1:41

// 2

function x(callback) { setTimeout(() => { callback(new Error(':P')) }, 1000) }

try {
    x(error => console.log(error.message))
} catch(error) {
    console.log(error.message)
}
undefined
// VM4593:4 :P