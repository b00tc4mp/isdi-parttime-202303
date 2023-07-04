var machine = new Object

machine.status = 'off'
machine.date = new Date

// HAPPY
machine.setStatus = function(status, date) { 
    this.status = status, this.date = date

    return status === 'on'
}

// UNHAPPY

/*
machine.setStatus = (status, date) => { 
    this.status = status, this.date = date

    return status === 'on'
}
*/

/*
machine.setStatus = function(status, date) { 
    this.status = status, this.date = date

    return status === 'on'
}.bind(this)
*/

machine.setStatus('on', new Date)