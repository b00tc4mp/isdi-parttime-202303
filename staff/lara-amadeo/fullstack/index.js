console.log('keloke')
debugger
STEP = 5
class Character {
    constructor(icon) {
        this.icon = icon

        this.position = 0
        this.time = Date.now()
    }

    move(){
        this.position += Math.round(STEP * (1 - Math.random()))
    }

    render(){
        console.log(' '.repeat(this.position), this.icon)
    }
}

const startTime = Date.now()

const penny = new Character('Penny')
const sheldon = new Character('Sheldon')
const raj = new Character('Raj')
const amy = new Character('Amy')

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

       result = (`First place is for ${(participants.find(char => char.time === finishLine[0])).icon}, second place is for ${(participants.find(char => char.time === finishLine[1])).icon}, third place for ${(participants.find(char => char.time === finishLine[2])).icon} and last but not least ${(participants.find(char => char.time === finishLine[3])).icon} `)
        console.log(result)
    

    const fs = require('fs')

    const content = result

    fs.writeFile('/Users/laraamadeo/workspace/isdi-parttime-202303/staff/lara-amadeo/fullstack/test.txt', content, err => {
        if (err) {
            console.error(err);
        }
  // file written successfully
})
    }
}, 100)