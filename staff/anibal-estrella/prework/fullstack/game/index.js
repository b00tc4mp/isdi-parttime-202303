console.clear();

const STEP = 5, LAPSET = 200

class Car {
    constructor(icon) {
        this.icon = icon
        this.pos = 0
        this.pos = 0
    }
    move() {
        this.pos +=  Math.round(STEP * (1 - Math.random()))
    }

    render() {
        console.log(' '.repeat(this.pos), this.icon);
    }

}
let pos = 0

const taxi = new Car('🚕')
const thief = new Car('🚗')
const police = new Car('🚓')

console.log('Starting RACE...');

let count = [0,'🔴','🟡','🟢'];

const countdown = setInterval(() => {
  if (count[0] < 3) {
    console.clear();
    count[0]= count[0]+1
    console.log(count[count[0]]);
} else {
    console.clear();
    clearInterval(countdown);
    console.log('GO!');
  }
}, 1000);

setInterval(() => {

    setInterval(() => {
        console.clear();
        
        taxi.render()
        thief.render()
        police.render()
        
        taxi.move()
        thief.move()
        police.move()
        
    }, 200)

}, 4000)