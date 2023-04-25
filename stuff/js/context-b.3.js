var machine = new Object

machine.status = 'off'

machine.setStatus = function(status) { this.status = status }

/*
machine.setStatus('on')
console.log(machine)
machine.setStatus('off')
console.log(machine)
*/

/*
var setStatus = machine.setStatus.bind(machine)
setStatus('on')
console.log(machine)
setStatus('off')
console.log(machine)
*/

function bind(funktion, context) {
    return function(param) {
        funktion.call(context, param)
    }
}

var setStatus = bind(machine.setStatus, machine)
setStatus('on')
console.log(machine)
setStatus('off')
console.log(machine)


// VM7692:30 {status: 'on', setStatus: ƒ}
// VM7692:32 {status: 'off', setStatus: ƒ}
// undefined