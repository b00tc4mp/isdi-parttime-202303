const registerUser = require('./registerUser')

// registerUser('Pepito Grillo', 'pepito@grillo.com', '123123123', error => {
registerUser('Campa Nilla', 'campa@nilla.com', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})