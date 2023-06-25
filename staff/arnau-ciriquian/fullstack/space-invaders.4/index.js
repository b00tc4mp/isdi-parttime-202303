const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.input.on('keypress', (key, data) => {
    if (data.ctrl && data.name === 'c') {
        process.exit();
    } else if (data.name === 'd') {
        player.moveRight()
    } else if (data.name === 's') {
        player.moveLeft()
    } else if (data.name === 'k') {
        player.shoot()
    }
})

/*class Missile {
    constructor(icon, launchPosition) {
        this.icon = icon

        this.hPos = launchPosition
        this.vPos = 5
    }
}*/

const launchedMissiles = [null, null, null, null, null]

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

    shoot() {
        launchedMissiles.splice(0, 1, `${this.pos.toString()}`)
    }

    render() {
        console.log(emptySpace.repeat(0 + this.pos), this.icon, emptySpace.repeat(19 - this.pos))
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
        if (this.pos !== 1 && this.pos !== (19 - this.invadersRow.length)) {
            this.pos += this.direction
        }
        else if (this.pos === (19 - this.invadersRow.length)) {
            this.direction = -1
            this.pos += this.direction
        }
        else if (this.pos === 1) {
            this.direction = 1
            this.pos += this.direction
        }
    }

    render() {
        console.log(emptySpace.repeat(0 + this.pos), this.invadersRow.join('  '), emptySpace.repeat(20 - this.pos - this.invadersRow.length))
    }
}

const player = new SpaceShip('🚀')
const enemiesFirstRow = new Invaders('👽')
let timer = 0
const LAPSE = 250
const emptySpace = '    '

//let test = ''

const fs = require('fs')

const interval = setInterval(() => {
    console.clear()
    launchedMissiles.splice(0, 0, null)
    launchedMissiles.pop()

    enemiesFirstRow.move()

    console.log(emptySpace.repeat(20))
    enemiesFirstRow.render()
    console.log(emptySpace.repeat(20))
    console.log(emptySpace.repeat(20))
    console.log(emptySpace.repeat(20))
    player.render()

    timer += LAPSE

    const time = timer / 1000
    console.log(`${time.toFixed(2)} s`)

    fs.appendFile('C:/Users/Arnau/workspace/isdi-parttime-202303/staff/arnau-ciriquian/fullstack/space-invaders/result.txt', `player pos: ${player.pos.toString()} - shot missiles: ${launchedMissiles.toString()}\n`, err => {
        if (err) {
            console.error(err)
        }
    })

    if (timer >= 10000)
        clearInterval(interval)
}, LAPSE)