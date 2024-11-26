let machine = new Object // {}
machine.date = new Date;
machine.status = "off"

machine.start = function() {this.status = "on"}
machine.stop = function () {this.status = "off"}
machine.setStatus = function(status, date) {
    this.status = status, 
    this.date = date

    return status === "on";
};

function bind (funktion, context){
    return function(...param){
        // funktion.appy(context, param) // acepta un arr como parametros.
        return funktion.call(context, ...param)
    }
}

var start = bind(machine.start, machine);
var stop = bind(machine.stop, machine);
let setStatus = bind(machine.setStatus, machine);

//setStatus("hola", new Date);

console.log(setStatus(machine.setStatus, new Date));