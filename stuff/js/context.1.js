var machine = new Object

machine.status = 'off'

machine.start = function() {
    this.status = 'on'
}
ƒ () {
    this.status = 'on'
}
machine
// {status: 'off', start: ƒ}
machine.start()
// undefined
machine
// {status: 'on', start: ƒ}