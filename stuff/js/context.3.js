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