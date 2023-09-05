import { menuSelection } from "./index.js"

const posMain = 16, posMenu = 2, posSelector = 18, posFoe = 35, posPj = 5

export const renderMenu = () => {
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

export const renderGame = (player, enemy) => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posFoe), enemy.icon, enemy.name)
    console.log(' '.repeat(posFoe), 'HP: ', enemy.hp)
    console.log(' ')
    console.log(' '.repeat(posPj), player.icon, player.name)
    console.log(' '.repeat(posPj), 'Hp: ', player.hp)
}

export const renderActionsMenu = (player) => {
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

export const renderAction = (attacker, defender, action, damage, amountHealed) => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMenu), `The ${attacker.name} ${action}s!`)
    if (action === 'attack' || action === 'special attack') console.log(' '.repeat(posMenu), `It deals ${damage} damage to enemy ${defender.name}!`)
    if (action === 'heal') console.log(' '.repeat(posMenu), `It heals ${amountHealed} Hp!`)
    console.log('')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'End turn')
}

export const renderOptions = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final  ⚓️ FantaSea')
    console.log('')
    console.log(' '.repeat(4), 'Final FantSea is a turn based fighting game')
    console.log(' '.repeat(2), 'Choose your character and battle against your foes')
    console.log(' '.repeat(4), 'Each turn choose your action to defeat them')
    console.log(' '.repeat(12), 'Last creature standing wins!')
    console.log('')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Go Back')
}

export const renderLostGame = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final  ⚓️ FantaSea')
    console.log('')
    console.log(' '.repeat(17), '☠ Game over...')
    console.log('')
    console.log('')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Go Back')
}

export const renderWonGame = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final  ⚓️ FantaSea')
    console.log('')
    console.log(' '.repeat(17), '🏆 You won!!')
    console.log('')
    console.log('')
    console.log(' '.repeat(posSelector), (menuSelection === 0 ? '🔱' : ' '.repeat(posMenu)), 'Go Back')
}