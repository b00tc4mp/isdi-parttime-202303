// IMPORTS
import readline from 'readline'
import { writeFile } from 'fs/promises'
import { Warrior } from './characters.mjs';
import { renderMenu, renderOptions, renderGame, renderActionsMenu, renderAction, renderLostGame, renderWonGame } from './renders.mjs';

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

        } else if (menuSelection === 1) {
            menuSelection = 0
            menu = false
            options = true

        } else if (menuSelection === 2) process.exit()

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

    } else if (data.name === 'k' && endGame) {
        menu = true
        game = false
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
    } else if (action === 'special attack') {
        damage = attacker.specialAttack()
        defender.hp = defender.hp - damage
    } else if (action === 'heal') {
        amountHealed = attacker.healHp()
        attacker.hp = attacker.hp + amountHealed
    }

    if (attacker.hp <= 0 || defender.hp <= 0) {
        endGame = true
        playerAction = ''
        enemyAction = ''
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