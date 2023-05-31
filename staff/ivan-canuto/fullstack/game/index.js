// import fs from 'fs'
const fs = require('fs')

const fileRoute  = 'results.txt'

const STEP = 5, LAPSE = 100

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
    const result = `${this.name} = post = ${this.pos}, time = ${this.time}`
    console.log(result)
    return result
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
    const newResults = [taxi.status(), police.status(), thief.status()]

    fs.readFile('results.txt', 'utf8', (error, data) => {
      if(error) {
        alert(error.message)
        console.log(error.stack)
        
        return
      }
      
      // let oldResults;
      // data ? oldResults = '\n\n' + data.toString() : oldResults = ''

      const allResults =  newResults.join('\n') + (data ? '\n\n' + data : '')
      const bufferResults = Buffer.from(allResults)
      
      fs.writeFile(fileRoute, bufferResults, (error) => {
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