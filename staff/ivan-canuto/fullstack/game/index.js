// import fs from 'fs'
const fs = require('fs')

const fileRoute  = 'results.txt'

const STEP = 5, LAPSE = 200

class CarRace {
  constructor(name) {
    this.name = name
    this.pos = 0
    this.time = 0
  }

  move() {
    this.pos += Math.round(STEP * (1 - Math.random()))
  }

  render() {
    console.log(' '.repeat(this.pos), this.name);
  }

  status() {
    console.log(`${this.name} = post = ${this.pos}, time = ${this.time}`)
    return `${this.name} = post = ${this.pos}, time = ${this.time}`
  }
}

const taxi = new CarRace('taxi')
const police = new CarRace('police')
const thief = new CarRace('thief')

let finalTime = 0

let interval = setInterval(() => {
  console.clear()
  finalTime += LAPSE

  if(taxi.pos < 100) {
    taxi.render()
    taxi.move()
    taxi.time = finalTime
  }
  if(police.pos < 100) {
    police.render()
    police.move()
    police.time = finalTime
  }
  if(thief.pos < 100) {
    thief.render()
    thief.move()
    thief.time = finalTime  
  }

  if(taxi.pos >= 100 && police.pos >= 100 && thief.pos >= 100) {
    const results = [taxi.status(), police.status(), thief.status()]
    let oldResults = ''

    fs.readFile('results.txt', 'utf8', (error, data) => {
      if(error) {
        alert(error.message)
        console.log(error.stack)
        
        return
      }

      oldResults =  results.join('\n') + '\n\n' +(!data ? '' : data + '\n\n')
      
      fs.writeFile(fileRoute, oldResults, (error) => {
        if(error) {
          alert(error.message)
          console.log(error.stack)
          
          return
        }
    
        clearInterval(interval)
      })
    })

  }
}, LAPSE)