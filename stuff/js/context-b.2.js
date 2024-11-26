var machine = new Object

machine.status = 'off'

machine.setStatus = function(status) { this.status = status }

/*
machine.setStatus('on')
console.log(machine)
machine.setStatus('off')
console.log(machine)
*/

var setStatus = machine.setStatus.bind(machine)
setStatus('on')
console.log(machine)
setStatus('off')
console.log(machine)

// VM7347:16 {status: 'on', setStatus: ƒ}
// VM7347:18 {status: 'off', setStatus: ƒ}