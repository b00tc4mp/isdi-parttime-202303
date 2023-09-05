console.log('keloke')
debugger
STEP = 5
class Character {
    constructor(name) {
        this.name = name

        this.position = 0
        this.time = Date.now()
    }

    move(){
        this.position += Math.round(STEP * (1 - Math.random()))
    }

    render(){
        console.log(' '.repeat(this.position), this.name)
    }
}

const startTime = Date.now()

const penny = new Character('Penny')
const sheldon = new Character('Sheldon')
const raj = new Character('Raj')
const amy = new Character('Amy')

let counter = 0

const interval = setInterval(() => {
    console.clear()

    let result

    if(penny.position < 100){
        penny.render()
        penny.move()
        penny.time = Date.now()
    }

    if(sheldon.position < 100){
        sheldon.move()
        sheldon.render()
        sheldon.time = Date.now()
    }

    if(raj.position < 100){
        raj.move()
        raj.render()
        raj.time = Date.now()
    }

    if(amy.position < 100){
        amy.move()
        amy.render()
        amy.time = Date.now()
    }

    if(penny.position >= 100 && sheldon.position >= 100 && raj.position >= 100 && amy.position >= 100){
        clearInterval(interval)

        penny.time = penny.time - startTime
        sheldon.time = sheldon.time - startTime
        raj.time = raj.time - startTime
        amy.time = amy.time - startTime

        const finishLine = []
        const participants = [penny, sheldon, raj, amy]
        
        finishLine.push(penny.time, sheldon.time, raj.time, amy.time)
        finishLine.sort((a, b) => a - b)

        console.clear()

        counter += 1

        let data = [
            {
                name: penny.name,
                time: penny.time
            },
            {
                name: sheldon.name,
                time: sheldon.time
            },
            {
                name: raj.name,
                time: raj.time
            },
            {
                name: amy.name,
                time: amy.time
            }
        ]
       
    
       result = (`Round ${counter} - First place is for ${(participants.find(char => char.time === finishLine[0])).name}, second place is for ${(participants.find(char => char.time === finishLine[1])).name}, third place for ${(participants.find(char => char.time === finishLine[2])).name} and last but not least ${(participants.find(char => char.time === finishLine[3])).name} `)
    
       console.log(result)
    

    const fs = require('fs')

    const content = JSON.stringify(data, null, 2)

    fs.appendFile('/Users/laraamadeo/workspace/isdi-parttime-202303/staff/lara-amadeo/fullstack/test.txt', content, err => {
        if (err) {
            console.error(err)
        }
})
    }
}, 100)