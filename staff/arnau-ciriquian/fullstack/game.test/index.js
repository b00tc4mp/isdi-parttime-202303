// IMPORTS
import readline from 'readline'
import { appendFile } from 'fs/promises'
import { Warrior } from './characters.js';
import { renderMenu, renderOptions, renderGame, renderActionsMenu, renderAction, renderLostGame, renderWonGame } from './renders.js';

// TEXT MANAGEMENT
const logEvent = (result) => {
    appendFile('/Users/Arnau/workspace/isdi-parttime-202303/staff/arnau-ciriquian/fullstack/game/logBook.txt', result, err => {
        if (err) {
            console.error(err)
        }
    })
}

let result = `Session started - ${(new Date).toLocaleString('en-UK')} \n`
logEvent(result)
//
// KEY MANAGEMENT
//const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Set up the event listener for key presses
rl.input.on('keypress', (key, data) => {
    if (data.name === 's' && menuSelection < 2) {
        if (menu || (game && playerTurn && !playerAction)) menuSelection++
    } else if (data.name === 'w' && menuSelection > 0) {
        if (menu || (game && playerTurn && !playerAction)) menuSelection--
    } else if (data.name === 'k' && menu) {
        if (menuSelection === 0) {
            menuSelection = 0
            menu = false
            game = true
            playerTurn = true
            result = `-\nNew Game - ${(new Date).toLocaleString('en-UK')} \n`
            logEvent(result)

        } else if (menuSelection === 1) {
            menuSelection = 0
            menu = false
            options = true
            result = `-\nMenu to Options \n`
            logEvent(result)

        } else if (menuSelection === 2) {
            result = `-\nSession ended - ${(new Date).toLocaleString('en-UK')} \n \n`
            logEvent(result)

            setTimeout(() => {
                process.exit()
            }, 10)
        }

    } else if (data.name === 'k' && game) {
        if (menuSelection === 0 && playerTurn && !playerAction) {
            playerAction = 'attack'
            menuSelection = 0
            //
            resolveAction(megalodon, kraken, playerAction)
            megalodon.reset('damage')
            //

        } else if (menuSelection === 1 && playerTurn && !playerAction) {
            playerAction = 'special attack'
            menuSelection = 0
            resolveAction(megalodon, kraken, playerAction)
            megalodon.reset('damage')

        } else if (menuSelection === 2 && playerTurn && !playerAction) {
            playerAction = 'heal'
            menuSelection = 0
            resolveAction(megalodon, kraken, playerAction)
            megalodon.reset('heal')

        } else if (menuSelection === 0 && playerTurn && playerAction) {
            playerAction = ''
            playerTurn = false
            enemyTurn = true
            //
            determineEnemyAction()
            resolveAction(kraken, megalodon, enemyAction)
            kraken.reset('damage')
            kraken.reset('heal')
            //
        } else if (menuSelection === 0 && enemyTurn && enemyAction) {
            enemyAction = ''
            playerTurn = true
            enemyTurn = false
        }

    } else if (data.name === 'k' && options) {
        menu = true
        options = false
        result = `Options to menu \n`
        logEvent(result)

    } else if (data.name === 'k' && endGame) {
        menu = true
        game = false
        result = `Game ended \n`
        logEvent(result)
    }

    refreshScreen()
});


const kraken = new Warrior('🦑', 'Kraken')
kraken.super()
const megalodon = new Warrior('🦈', 'Megalodon')
megalodon.super()

//GAME RENDERING
export let menuSelection = 0
let menu = true
let options = false
let game = false
let endGame = false
let playerTurn = false
let enemyTurn = false
let playerAction = ''
let enemyAction = ''
let damage = 0
let amountHealed = 0

const determineEnemyAction = () => {
    const actionIndex = Math.floor(Math.random() * 3)

    if (actionIndex === 0) enemyAction = 'attack'
    if (actionIndex === 1) enemyAction = 'special attack'
    if (actionIndex === 2) enemyAction = 'heal'
}

const resolveAction = (attacker, defender, action) => {
    if (action === 'attack') {
        damage = attacker.attack()
        defender.hp = defender.hp - damage
        result = `${attacker.name} makes an attack of ${damage} damage to enemy ${defender.name} \n`
    } else if (action === 'special attack') {
        damage = attacker.specialAttack()
        defender.hp = defender.hp - damage
        result = `${attacker.name} makes a special attack of ${damage} damage to enemy ${defender.name} \n`
    } else if (action === 'heal') {
        amountHealed = attacker.healHp()
        attacker.hp = attacker.hp + amountHealed
        result = `${attacker.name} healed for ${amountHealed} hp \n`
    }

    logEvent(result)

    if (defender.hp <= 0) {
        endGame = true
        playerAction = ''
        enemyAction = ''
        result = `${defender.name} lost all hp \n`
        logEvent(result)
    }

}

const refreshScreen = () => {
    console.clear()

    if (menu) renderMenu()
    else if (options) renderOptions()
    else if (game) {
        renderGame(megalodon, kraken)
        if (playerTurn && !playerAction && megalodon.hp > 0) renderActionsMenu(megalodon)
        else if (playerTurn && playerAction && megalodon.hp > 0 && kraken.hp > 0) {
            renderAction(megalodon, kraken, playerAction, damage, amountHealed)
        } else if (enemyTurn && kraken.hp > 0 && megalodon.hp > 0) {
            renderAction(kraken, megalodon, enemyAction, damage, amountHealed)
        }

        if (endGame && megalodon.hp <= 0 && kraken.hp > 0) {
            console.clear()
            renderLostGame()
            megalodon.reset('hp')
            kraken.reset('hp')
            game = false

        }
        else if (endGame && kraken.hp <= 0 && megalodon.hp > 0) {
            console.clear()
            renderWonGame()
            megalodon.reset('hp')
            kraken.reset('hp')
            game = false

        }
    }
}

refreshScreen()