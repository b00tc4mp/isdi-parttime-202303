const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set up the event listener for key presses
rl.input.on('keypress', (key, data) => {
    console.log('Key Pressed:', key);
    //refreshScreen()
});

const posMain  = 10
const posNew = 14

const renderMenu = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final ⚓ FantaSea')
    console.log(' '.repeat(posNew), 'New Game')
    console.log('')
    console.log('')
}

refreshScreen = () => {
    console.clear()

    renderMenu()
}

refreshScreen()