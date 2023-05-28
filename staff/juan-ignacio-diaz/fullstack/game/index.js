const STEP = 5, LAPSE = 200, FINISH = 50

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
        //console.log(`${this.icon}, driver = ${this.driver}, pos = ${this.pos}, time = ${this.time}`)
        return `${this.icon}, driver = ${this.driver}, pos = ${this.pos}, time = ${this.time}`
    }

    render() {
        console.log(' '.repeat(this.distance), this.icon, ' '.repeat(FINISH-this.distance), '|')
    }

    renderFinish() {
        console.log(' '.repeat(FINISH+1), '|' , this.icon)
    }
}

let pos = 0, time = 0

const car1 = new Car('🚗', 'Verstapen')
const car2 = new Car('🚗', 'Alonso')
const car3 = new Car('🚗', 'Sainz')

const interval = setInterval(() => {
    console.clear()
    time += LAPSE

    if (car1.distance < FINISH) {
        car1.render() 
        car1.move()
        car1.time = time
    }
    else {
        if (car1.pos != 0 ) 
            car1.pos = pos++
        car1.renderFinish() 
    }


    if (car2.distance < FINISH) {
        car2.render()
        car2.move()
        car2.time = time
    }
    else {
        if (car2.pos != 0 ) 
            car2.pos = pos++
        car2.renderFinish() 
    }
    
    if (car3.distance < FINISH) {
        car3.render()
        car3.move()
        car3.time = time
    }
    else {
        if (car3.pos != 0 ) 
            car3.pos = pos++
        car3.renderFinish() 
    }

    if (car1.pos != 0 && car2.pos != 0 && car3.pos != 0) {
        clearInterval(interval)

        const result = 'Race\n'+ car1.status() + '\n' + car2.status() + '\n' + car3.status() 
    
        console.log(result)        

        const fs = require('fs');

        fs.readFile('./result.txt', 'utf8', (err, resultPrevious) => {
            if (err) {
                console.error(err);
            }

            console.log(resultPrevious)
        });

        fs.appendFile('./result.txt', result, err => {
            if (err) {
                console.error(err);
            }
        });
    }   
}, LAPSE)

