const STEP = 5, LAPSE = 200, FINISH = 20

class Car {
    constructor(icon, name) {
        this.icon = icon

        this.pos = 0
        this.time = 0
        this.distance = 0
        this.driver = name
    }

    move() {
        this.distance += Math.round(STEP * (1 - Math.random()))
    }

    status() {
        return `${this.icon}, driver = ${this.driver}, pos = ${this.pos}, time = ${this.time}`
    }

    render() {
        console.log(' '.repeat(this.distance), this.icon, ' '.repeat(FINISH-this.distance), FINISH-this.distance===0 ? '' : '|')
    }

    renderFinish() {
        console.log(' '.repeat(FINISH+4), '|' , this.icon, this.pos)
    }
}

let pos = 0, time = 0

const cars = []
cars.push(new Car('🚗', 'Verstapen'))
cars.push(new Car('🚗', 'Alonso'))
cars.push(new Car('🚗', 'Sainz'))
cars.push(new Car('🚗', 'Rusell'))


const interval = setInterval(() => {
    console.clear()
    time += LAPSE

    cars.forEach(car => {
        if (car.distance < FINISH) {
            car.render() 
            car.move()
        }
        else {
            if (car.pos === 0 ) {
                car.pos = pos++
                car.time = time
            }
            car.renderFinish() 
        }
    })

    if (!cars.some(car => car.pos === 0)){
        clearInterval(interval)

        var today = new Date();

        cars.sort(function(a, b) {
            return a.pos - b.pos;
        })

        const race = 'Race ' + today.toLocaleString('es-ES')
        const result = cars.reduce((resultCars, car) => resultCars + car.status() + '\n', race+'\n')
            
        console.log(result)    

        const saveResult = cars.map(car => car.status())
        const saveRace = JSON.stringify([{ race: race, result: saveResult }])

        const fs = require('fs');

        fs.readFile('./result.txt', 'utf8', (err, resultPrevious) => {
            if (err) {
                console.error('readFile error' + err);
            }

            console.log(resultPrevious)
            console.log(resultPrevious ? JSON.parse(resultPrevious) : '')

            fs.wr('./result.txt', saveRace, err => {
                if (err) {
                    console.error('appenfile error' + err);
                }
            });

        });


    }   
}, LAPSE)

