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

    } else if (data.name === 'k' && game && playerTurn && !playerAction) {
        if (menuSelection === 0 ) {
            playerAction = 'attack'
            menuSelection = 0

        } else if (menuSelection === 1) {
            playerAction = 'special attack'
            menuSelection = 0

        } else if (menuSelection === 2) {
            playerAction = 'heal'
            menuSelection = 0

        } 
    } else if (menuSelection === 0 && playerTurn && playerAction) {
        playerAction = ''
        playerTurn = false
        enemyTurn = true
    } else if (menuSelection === 0 && enemyTurn && enemyAction) {
        enemyAction = ''
        playerTurn = true
        enemyTurn = false
    } else if (data.name === 'k' && options) {
        menu = true
        options = false

    } else if (data.name === 'k' && endGame) {
        menu = true
        game = false
    }

    refreshScreen()
    console.log('Key Pressed:', key)
});