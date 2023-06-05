const STEP = 5
const LAPSE = 200


class Runner {
    constructor(icon) {
        this.icon = icon
        this.position = 0
        this.time = 0
        this.finalTime = 0
    }

    move() {
        this.position += Math.round(STEP * (1 - Math.random()))
    }

    render(){
        console.log(' '.repeat(this.position), this.icon)
    }

    // status() {
    //     return(`${this.icon} : position = ${this.position}, time = ${this.finalTime} \n`)
    // }

    status() {
        let result
        return result = {icon: this.icon, position: this.position, finalTime: this.finalTime}
    }
}


const fox = new Runner('🦊')
const rabbit = new Runner('🐰')
const cat = new Runner('🐱')
const startTime = Date.now()

// let ranking = {result:[]}

const interval = setInterval(() => {
    console.clear()

    if(fox.position < 100){
        fox.render()
        fox.move()
        fox.time = Date.now()
    }

    if(rabbit.position < 100){
        rabbit.render()
        rabbit.move()
        rabbit.time = Date.now()
    }

    if(cat.position < 100) {
        cat.render()
        cat.move()
        cat.time = Date.now()
    }

    if (fox.position >= 100 && rabbit.position >= 100 & cat.position >= 100){
        clearInterval(interval)

        fox.finalTime = fox.time - startTime
        rabbit.finalTime = rabbit.time - startTime
        cat.finalTime = cat.time - startTime

        // result += fox.status()
        // result += rabbit.status()
        // result += cat.status()
        // const fs = require('fs')

        // fs.writeFile('/Users/cristinagurriaran/workspace/isdi-parttime-202303/staff/cristina-gurriaran/fullstack/game/results.txt', result, err => {
        //     if (err) {
        //         console.error(err);
        //     }
        // })

        let foxResult = fox.status()
        let rabbitResult = rabbit.status()
        let CatResult = cat.status()

        let ranking = {foxResult, rabbitResult, CatResult}

        const fs = require('fs')

        fs.writeFile("ranking.json", JSON.stringify(ranking), err => {
            if (err) {
                console.error(err);
            }
        })
    }

}, LAPSE)




