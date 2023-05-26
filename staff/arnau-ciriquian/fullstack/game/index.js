const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set up the event listener for key presses
rl.input.on('keypress', (key, data) => {
    if (data.ctrl && data.name === 'c') {
        // If Ctrl+C is pressed, exit the program
        process.exit();
    } else {
        // Log the pressed key
        console.log('Key Pressed:', key);
    }
    if (data.name === 's' && menuSelection < 2) {
        menuSelection ++
    } else if (data.name === 'w' && menuSelection > 0) {
        menuSelection --
    }

    //refreshScreen()
    console.log(menuSelection)
});

// Set the terminal in raw mode to capture individual key presses
rl.input.setRawMode(true);
rl.input.resume();

const posMain  = 10, posMenu = 14
let menuSelection = 0

const renderMenu = () => {
    console.log('')
    console.log('')
    console.log(' '.repeat(posMain), 'Final ⚓ FantaSea')
    console.log(' '.repeat(posMenu), 'New Game')
    console.log(' '.repeat(posMenu), 'Options')
    console.log(' '.repeat(posMenu), 'Exit Game')
    console.log('')
    console.log('')
}

refreshScreen = () => {
    console.clear()

    renderMenu()
}

refreshScreen()