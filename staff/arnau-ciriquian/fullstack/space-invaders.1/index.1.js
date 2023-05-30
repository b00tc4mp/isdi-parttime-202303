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
        console.log(' 🌌 '.repeat(0 + this.pos),this.icon,' 🌌 '.repeat(19 - this.pos))
    }
}

const player = new SpaceShip('🛸')
let timer = 0
const LAPSE = 100

const interval = setInterval(() => {
    console.clear()

    player.render()

    timer += LAPSE

    const time = timer / 1000
    console.log(`${time.toFixed(2)} s`)

    if (timer >= 10000)
        clearInterval(interval)
}, LAPSE)