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

var start = machine.start.bind(machine)
var stop = machine.stop.bind(machine)
start() // window.start()
console.log(machine)
stop() // window.stop()
console.log(machine)


