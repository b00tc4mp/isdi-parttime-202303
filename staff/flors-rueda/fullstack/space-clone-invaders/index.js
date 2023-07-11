const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let characterPosition = Math.floor(process.stdout.columns / 2);

const pressedKeys = new Set();

const enemyPositions = [];

const numberOfLinesAbove = 3;

const enemyFallSpeed = 1;

let gameOver = false;

const generateEnemyPosition = () => {
  const maxPosition = process.stdout.columns - 1;
  const randomPosition = Math.floor(Math.random() * maxPosition);
  return randomPosition;
}

const updateEnemies = () => {
  enemyPositions.forEach((position, index) => {
    if (position >= process.stdout.rows - 1) {
      enemyPositions.splice(index, 1);
    }
  });

  for (let i = 0; i < enemyFallSpeed; i++) {
    enemyPositions.push(generateEnemyPosition());
  }

  if (enemyPositions.includes(characterPosition)) {
    gameOver = true;
    endGame();
  }
}

const updateCharacterPosition = () => {
  if (gameOver) return; 

  if (pressedKeys.has('a')) {
    characterPosition = Math.max(characterPosition - 1, 0);
  }

  if (pressedKeys.has('d')) {
    characterPosition = Math.min(characterPosition + 1, process.stdout.columns - 1);
  }

  console.clear();


  for (let row = 0; row < process.stdout.rows; row++) {
    let line = '';
    for (let col = 0; col < process.stdout.columns; col++) {
      if (row === process.stdout.rows - 1 && col === characterPosition) {
        line += 'O';
      } else if (row < numberOfLinesAbove && enemyPositions.includes(col)) {
        line += 'x';
      } else {
        line += ' ';
      }
    }
    console.log(line);
  }
}

const endGame = () => {
  console.log('Game Over');
  process.exit();
}

setInterval(updateEnemies, 500);
setInterval(updateCharacterPosition, 100);

process.stdin.on('keypress', (_, key) => {
  if (key.name === 'a') {

    pressedKeys.add('a');
  } else if (key.name === 'd') {
    pressedKeys.add('d');
  } else if (key.ctrl && key.name === 'c') {
    process.exit();
  }
});

process.stdin.on('keyup', (_, key) => {
  if (key.name === 'a') {
    pressedKeys.delete('a');
  } else if (key.name === 'd') {
    pressedKeys.delete('d');
  }
});
