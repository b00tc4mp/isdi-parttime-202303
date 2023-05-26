class Machine {
    constructor(status) {
    this.status = status;
  }

    start = () => {
        this.status = 'on'
    }

    stop() {
        this.status = 'off'
    }
}

var car = new Machine('off')

var truck = new Object

car.start()
truck.status = 'on'

car.stop()
stop.bind(truck)
