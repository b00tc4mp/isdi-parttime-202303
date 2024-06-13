const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
// Set up the event listener for key presses
rl.input.on('keypress', (key, data) => {
if (data.ctrl && data.name === 'c') {
    // If Ctrl+C is pressed, exit the program
    process.exit();
} else if (data.name === 'd') {
    player.moveRight()
} else if (data.name === 'a') {
    player.moveLeft()
}
});

class SpaceShip {
    constructor(icon) {
        this.icon = icon

        this.pos = 0
        this.lifes = 3
    }

    moveRight() {
        if (this.pos < 19)
            this.pos += 1
    }

    moveLeft() {
        if (this.pos > 0)
            this.pos -= 1
    }

    shoot() {}

    render() {
        console.log(' 🌌 '.repeat(0 + this.pos), this.icon, ' 🌌 '.repeat(19 - this.pos))
    }
}

class Invaders {
    constructor(icon) {
        this.icon = icon

        this.pos = 2

        this.direction = 1

        this.invadersRow = [this.icon, this.icon, this.icon, this.icon, this.icon, this.icon]
    }

    move() {
        if (this.pos !== 1 && this.pos !== (18 - this.invadersRow.length)) {
            this.pos += this.direction
        }
        else if (this.pos === (18 - this.invadersRow.length)) {
            this.direction = -1
            this.pos += this.direction
        }
        else if (this.pos === 1) {
            this.direction = 1
            this.pos += this.direction
        }
    }

    render() {
        console.log(' 🌌 '.repeat(0 + this.pos), this.invadersRow, ' 🌌 '.repeat(19 - this.pos - this.invadersRow.length))
    }
}

const player = new SpaceShip('🛸')
const enemiesFirstRow = new Invaders('👾')
let timer = 0
const LAPSE = 250
const emptySpace = ' 🌌 '

let test = ''

const fs = require('fs')

const interval = setInterval(() => {
    console.clear()

    enemiesFirstRow.move()

    console.log(emptySpace.repeat(20))
    enemiesFirstRow.render()
    console.log(emptySpace.repeat(20))
    console.log(emptySpace.repeat(20))
    player.render()

    timer += LAPSE

    const time = timer / 1000
    console.log(`${time.toFixed(2)} s`)

    /*fs.appendFile('/Users/ictio/Downloads/Py/result.txt', `enemies pos: ${enemiesFirstRow.pos.toString()} - enemies direction: ${enemiesFirstRow.direction.toString()} - back space: ${19 - enemiesFirstRow.pos - enemiesFirstRow.invadersRow.length} - ${test}\n`, err => {
        if (err) {
            console.error(err)
        }
    })*/

    if (timer >= 10000)
        clearInterval(interval)
}, LAPSE)