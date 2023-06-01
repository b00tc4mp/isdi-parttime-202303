const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.input.on('keypress', (key, data) => {
    if (data.ctrl && data.name === 'c') {
        //process.exit();
        readWriteJson(`End Game`)

        setTimeout(() => {
            process.exit()
        }, 10)
    } else if (data.name === 'd') {
        player.moveRight()
    } else if (data.name === 's') {
        player.moveLeft()
    } else if (data.name === 'k') {
        player.shoot()
    }
})

class Missile {
    constructor(icon, launchPosition) {
        this.icon = icon

        this.hPos = launchPosition
        this.vPos = 0
    }
}

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
        const missile = new Missile('♠️', this.pos)
        launchedMissiles.splice(0, 1, [missile.hPos, missile.vPos])
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

const moveMissiles = (missiles) => {
    missiles.forEach(missile => {
        if (missile) missile[1] += 1
    });
}

const renderRow = (row, missiles) => {
    if (missiles[row]) {
        console.log(emptySpace.repeat(0 + missiles[row][0]),'♠️', emptySpace.repeat(19 - missiles[row][0]))
    } else {
        console.log(emptySpace.repeat(20))
    }   
}

const player = new SpaceShip('🚀')
const enemiesFirstRow = new Invaders('👽')
let timer = 0
const LAPSE = 250
const emptySpace = '    '

const fs = require('fs')
const readWriteJson = (newInputData) => {
    fs.readFile('myjsonfile.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            
            const results = (data ? JSON.parse(data) : [])
            const newData = newInputData
            results.push(newData)
            const json = JSON.stringify(results)

            fs.writeFile('myjsonfile.json', json, 'utf8', function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Data added and written to the file.")
                }
            })
            
        }
    })
}

readWriteJson(`New Game`)

const interval = setInterval(() => {
    console.clear()

    readWriteJson(`player pos: ${player.pos.toString()} - missiles fired: ${launchedMissiles.toString()}`)

    renderRow(4, launchedMissiles)
    renderRow(3, launchedMissiles)
    renderRow(2, launchedMissiles)
    renderRow(1, launchedMissiles)
    renderRow(0, launchedMissiles)
    player.render()


    launchedMissiles.splice(0, 0, null)
    launchedMissiles.pop()

    enemiesFirstRow.move()

    /*console.log(emptySpace.repeat(20))
    enemiesFirstRow.render()*/
    

    timer += LAPSE

    const time = timer / 1000
    console.log(`${time.toFixed(2)} s`)

    moveMissiles(launchedMissiles)

    if (timer >= 10000)
        clearInterval(interval)
}, LAPSE)


/*


const renderRow = (row, missiles) => {
    if (missiles[

}

*/