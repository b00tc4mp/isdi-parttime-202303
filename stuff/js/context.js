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

/*
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
*/

var start = function() { machine.start.call(machine) }
var stop = function() { machine.stop.call(machine) }
start()
console.log(machine)
stop()
console.log(machine)

// VM6562:43 {status: 'on', start: ƒ, stop: ƒ}
// VM6562:45 {status: 'off', start: ƒ, stop: ƒ}
// undefined