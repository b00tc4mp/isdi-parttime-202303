// KEY MANAGEMENT
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set up the event listener for key presses
rl.input.on('keypress', (key, data) => {
   if (data.name === 's' && menuSelection < 2) {
        menuSelection ++
    } else if (data.name === 'w' && menuSelection > 0) {
        menuSelection --
    } else if (data.name === 'k' && menu) {
        if (menuSelection === 1) {
            menuSelection = 0
            menu = false
            options = true
        } else if (menuSelection === 2) process.exit()
    } else if (data.name === 'k' && options) {
        menu = true
        options = false
    }

    refreshScreen()
});

//CHARACTER MANAGEMENT
class Character {
    constructor(icon, name) {
        this.icon = icon
        this.name = name
    }
}

class Warrior extends Character {
    super() {
        this.dmg = 100
        this.hp = 500
    }

    attack() {
        this.dmg += Math.round(20 * (1 - Math.random()))
        return this.dmg
    }
}

const kraken = new Warrior('🦑', 'Kraken')
kraken.super()
const megalodon = new Warrior('🦈', 'Megalodon')
megalodon.super()

//GAME RENDERING
const posMain  = 16, posMenu = 2, posSelector = 18
let menuSelection = 0
let menu = true
let options = false

const renderMenu = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final  ⚓️ FantaSea')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'New Game')
    console.log(' '.repeat(posSelector), (menuSelection === 1 ? '🔱' : ' '.repeat(posMenu)), 'Options')
    console.log(' '.repeat(posSelector), (menuSelection === 2 ? '🔱' : ' '.repeat(posMenu)), 'Exit Game')
    console.log('')
    console.log('')
    console.log('(Use "s" and "d" to navigate the menu and "k" to accept)')
    console.log(menuSelection)
}

const renderOptions = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final  ⚓️ FantaSea')
    console.log('Final FantSea is a turn based fighting game')
    console.log('Choose your character and battle against your foes')
    console.log('Each turn choose your action to defeat them')
    console.log('Last creature standing wins!')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Go Back')

}

refreshScreen = () => {
    console.clear()

    if (menu) renderMenu()
    if (options) renderOptions()
}

refreshScreen()