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
});

// Set the terminal in raw mode to capture individual key presses
//rl.input.setRawMode(true);
//rl.input.resume();

// Prompt the user for input
// rl.question('Press any key (or Ctrl+C to exit): ', () => {
//   // Code to execute after the user provides input
//   console.log('Thank you for pressing a key!');
//   rl.close();
// });