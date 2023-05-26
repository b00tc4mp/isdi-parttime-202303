var machine = new Object

machine.status = 'off'

machine.start = function() {
    this.status = 'on'
}

machine.stop = function() {
    this.status = 'off'
}

machine.start()
machine.stop()

debugger
function bind(funktion, context) {
    return function() {
        funktion.call(context)
    }
}

var start = bind(machine.start, machine)
var stop = bind(machine.stop, machine)

start()
console.log(machine)
stop()
console.log(machine)