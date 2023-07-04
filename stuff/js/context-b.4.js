var machine = new Object

machine.status = 'off'
machine.date = new Date

machine.setStatus = function(status, date) { this.status = status, this.date = date }

/*
machine.setStatus('on', new Date)
console.log(machine)
machine.setStatus('off', new Date)
console.log(machine)
*/


/*
var setStatus = machine.setStatus.bind(machine)
setStatus('on', new Date)
console.log(machine)
setStatus('off', new Date)
console.log(machine)
*/


function bind(funktion, context) {
    return function(...params) {
        //funktion.apply(context, params)
        funktion.call(context, ...params)
    }
}

var setStatus = bind(machine.setStatus, machine)
setStatus('on', new Date)
console.log(machine)
setStatus('off', new Date)
console.log(machine)


// VM8350:34 {status: 'on', date: Tue Apr 25 2023 20:59:22 GMT+0200 (Central European Summer Time), setStatus: ƒ}
// VM8350:36 {status: 'off', date: Tue Apr 25 2023 20:59:22 GMT+0200 (Central European Summer Time), setStatus: ƒ}
// undefined