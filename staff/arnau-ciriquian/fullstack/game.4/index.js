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
        if (menuSelection === 0 && playerTurn && !playerAction) {
            playerAction = 'attack'
            menuSelection = 0

        } else if (menuSelection === 1 && playerTurn && !playerAction) {
            playerAction = 'special attack'
            menuSelection = 0

        } else if (menuSelection === 2 && playerTurn && !playerAction) {
            playerAction = 'heal'
            menuSelection = 0

        } else if (menuSelection === 0 && playerTurn && playerAction) {
            playerAction = ''
            playerTurn = false
            enemyTurn = true
        } else if (menuSelection === 0 && enemyTurn && enemyAction) {
            enemyAction = ''
            playerTurn = true
            enemyTurn = false
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
let enemyTurn = false
let playerAction = ''
let enemyAction = ''
let damage = 0

const renderMenu = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final ⚓️ FantaSea')
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

const renderActionsMenu = (player) => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), `${player.name}'s`, 'turn')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Attack')
    console.log(' '.repeat(posSelector), (menuSelection === 1 ? '🔱' : ' '.repeat(posMenu)), 'Special attack')
    console.log(' '.repeat(posSelector), (menuSelection === 2 ? '🔱' : ' '.repeat(posMenu)), 'Heal')
    console.log('')
    console.log('')
    console.log('(Use "s" and "d" to navigate the menu and "k" to accept)')
}

const renderAction = (attacker, defender, action) => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMenu), `The ${attacker.name} ${action}s!`)
    if (action === 'attack' || action === 'special attack') console.log(' '.repeat(posMenu), `It deals ${damage}dmg to enemy ${defender.name}!`)
    if (action === 'heal') console.log(' '.repeat(posMenu), `It heals 200 Hp!`)
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

const determineEnemyAction = () => {
    const actionIndex = Math.floor(Math.random() * 3)

    if (actionIndex === 0) enemyAction = 'attack'
    if (actionIndex === 1) enemyAction = 'special attack'
    if (actionIndex === 2) enemyAction = 'heal'
}

// const resolveAction = (attacker, defender, action) => {
//     if (action === 'attack') {
//         damage = attacker.attack()
//     }
// }

refreshScreen = () => {
    console.clear()

    if (menu) renderMenu()
    if (options) renderOptions()
    if (game) renderGame()
    if (game && playerTurn && !playerAction) renderActionsMenu(megalodon)
    if (game && playerTurn && playerAction) renderAction(megalodon, kraken, playerAction)
    if (game && enemyTurn) {
        determineEnemyAction()
        renderAction(kraken, megalodon, enemyAction)
    }

    console.log(`Is player turn on? ${(playerTurn ===true)}`)
    console.log(`What is the last player action? ${playerAction}`)
    console.log(`Is enemy turn on? ${(enemyTurn ===true)}`)
    console.log(`What is the last enemy action? ${enemyAction}`)
}

refreshScreen()