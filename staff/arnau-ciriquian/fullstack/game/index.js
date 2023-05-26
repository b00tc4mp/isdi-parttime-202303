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
    }

    refreshScreen()
});

// Set the terminal in raw mode to capture individual key presses
rl.input.setRawMode(true);
rl.input.resume();

const posMain  = 16, posMenu = 2, posSelector = 18
let menuSelection = 0

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

refreshScreen = () => {
    console.clear()

    renderMenu()
}

refreshScreen()