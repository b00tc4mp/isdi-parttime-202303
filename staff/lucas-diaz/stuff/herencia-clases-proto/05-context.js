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

let start = machine.start.bind(machine) // start();
let stop = machine.stop.bind(machine)  //  stop();
let setStatus = machine.setStatus.bind(machine);


