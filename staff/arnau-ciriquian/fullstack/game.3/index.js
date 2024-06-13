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
        menuSelection++
    } else if (data.name === 'w' && menuSelection > 0) {
        menuSelection--
    } else if (data.name === 'k' && menu) {
        if (menuSelection === 0) {
            menuSelection = 0
            menu = false
            game = true
            playerTurn = true

        } else if (menuSelection === 1) {
            menuSelection = 0
            menu = false
            options = true

        } else if (menuSelection === 2) process.exit()

    } else if (data.name === 'k' && game) {
        if (menuSelection === 0) {
            playerAction = 'attack'
            menuSelection = 0

        } else if (menuSelection === 1) {
            playerAction = 'special attack'
            menuSelection = 0

        } else if (menuSelection === 2) {
            playerAction = 'heal'
            menuSelection = 0

        }

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
const posMain = 16, posMenu = 2, posSelector = 18, posFoe = 35, posPj = 5
let menuSelection = 0
let menu = true
let options = false
let game = false
let playerTurn = false
let playerAction = ''

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
}

const renderGame = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posFoe), kraken.icon, kraken.name)
    console.log(' '.repeat(posFoe), 'HP: ', kraken.hp)
    console.log(' ')
    console.log(' '.repeat(posPj), megalodon.icon, megalodon.name)
    console.log(' '.repeat(posPj), 'Hp: ', megalodon.hp)
}

const renderActionsMenu = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), `${megalodon.name}'s`, 'turn')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Attack')
    console.log(' '.repeat(posSelector), (menuSelection === 1 ? '🔱' : ' '.repeat(posMenu)), 'Special attack')
    console.log(' '.repeat(posSelector), (menuSelection === 2 ? '🔱' : ' '.repeat(posMenu)), 'Heal')
    console.log('')
    console.log('')
    console.log('(Use "s" and "d" to navigate the menu and "k" to accept)')
}

const renderAction = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMenu), `The ${megalodon.name} ${playerAction}s!`)
    if (playerAction === 'attack' || playerAction === 'special attack') console.log(' '.repeat(posMenu), `It deals 200dmg to enemy ${kraken.name}!`)
    if (playerAction === 'heal') console.log(' '.repeat(posMenu), `It heals 200 Hp!`)
    console.log('')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'End turn')
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
    if (game) renderGame()
    if (game && playerTurn && !playerAction) renderActionsMenu()
    if (game && playerTurn && playerAction) renderAction()
}

refreshScreen()