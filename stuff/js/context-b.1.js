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
    return function() {
        funktion.call(context)
    }
}

var setStatus = bind(machine.setStatus, machine)
setStatus('on')
console.log(machine)
setStatus('off')
console.log(machine)


// VM7514:30 {status: undefined, setStatus: ƒ}
// VM7514:32 {status: undefined, setStatus: ƒ}
// undefined