(index):36 Console was cleared
var machine = new Object

machine.status = 'off'

machine.start = function() { this.status = 'on' }

machine.stop = function() { this.status = 'off' }

machine.start()
machine.stop()

/*
var start = machine.start
var stop = machine.stop
start() // window.start()
stop() // window.stop()
*/

debugger

//var start = machine.start.bind(machine)
//var stop = machine.stop.bind(machine)

function bind(funktion, context) {
    return function() {
        funktion.call(context)
    }
}

var start = bind(machine.start, machine)
var stop = bind(machine.stop, machine)

start() // machine.start()
console.log(machine)
stop() // machine.stop()
console.log(machine)

var o = {}

var start2 = start.bind(o) // cannot re-bind
start2()

console.log(o)

// VM6068:34 {status: 'on', start: ƒ, stop: ƒ}
// VM6068:36 {status: 'off', start: ƒ, stop: ƒ}
// VM6068:43 {}
// undefined