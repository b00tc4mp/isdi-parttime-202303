var machine = new Object

machine.status = 'off'
machine.date = new Date

machine.setStatus = function(status, date) { 
    this.status = status, this.date = date

    //return status === 'on'? true : false
    return status === 'on'
}

/*
console.log(machine.setStatus('on', new Date))
console.log(machine)
console.log(machine.setStatus('off', new Date))
console.log(machine)
*/


/*
var setStatus = machine.setStatus.bind(machine)
console.log(setStatus('on', new Date))
console.log(machine)
console.log(setStatus('off', new Date))
console.log(machine)
*/



function bind(funktion, context) {
    return function(...params) {
        //funktion.apply(context, params)
        return funktion.call(context, ...params)
    }
}

var setStatus = bind(machine.setStatus, machine)
console.log(setStatus('on', new Date))
console.log(machine)
console.log(setStatus('off', new Date))
console.log(machine)



// VM8991:39 true
// VM8991:40 {status: 'on', date: Tue Apr 25 2023 21:03:45 GMT+0200 (Central European Summer Time), setStatus: ƒ}
// VM8991:41 false
// VM8991:42 {status: 'off', date: Tue Apr 25 2023 21:03:45 GMT+0200 (Central European Summer Time), setStatus: ƒ}
// undefined