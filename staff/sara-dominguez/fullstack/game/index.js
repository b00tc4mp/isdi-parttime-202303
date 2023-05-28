const STEP = 5, LAPSE = 200

class Car {
    constructor(icon) {
        this.icon = icon
        this.pos = 0
        this.time = 0
    }

    move() {
        this.pos += Math.round(STEP * (1 - Math.random()))

    }

    status() {
        return (`${this.icon}, pos = ${this.pos}, time = ${this.time}`)
    }

    render() {
        console.log(' '.repeat(this.pos), this.icon)

    }
}

let pos = 0, time = 0

const taxi = new Car('🚖')
const thief = new Car('🚘')
const police = new Car('🚔')

let result = ''

const interval = setInterval(() => {
    console.clear()
    time += LAPSE

    if (taxi.pos < 100) {
        taxi.render()
        taxi.move()
        taxi.time = time
    }

    if (thief.pos < 100) {
        thief.render()
        thief.move()
        thief.time = time
    }

    if (police.pos < 100) {
        police.render()
        police.move()
        police.time = time
    }

    if (taxi.pos >= 100 && thief.pos >= 100 && police.pos >= 100) {
        clearInterval(interval)

        result += taxi.status()
        result += thief.status()
        result += police.status()


        const fs = require('fs')

        fs.writeFile('/Users/saradominguez/workspace/isdi-parttime-202303/staff/sara-dominguez/fullstack/game/result.txt', result, error => {
            if (error) {
                console.log(error)
            }
        })
    }
}, LAPSE)




// TODO whrite results in a file

// const fs = require('fs')

// const content = 'some content!'


// fs.writeFile('/Users/saradominguez/workspace/isdi-parttime-202303/staff/sara-dominguez/fullstack/game/result.txt', content, error => {
//     if (error) {
//         console.log(error)
//     }
// })