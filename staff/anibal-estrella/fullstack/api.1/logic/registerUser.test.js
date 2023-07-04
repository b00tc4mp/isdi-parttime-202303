const registerUser = require('./registerUser')

// registerUser('Eli Carné', "Eli@gmail.com", '123123123', error => {
registerUser('enki estrella', "Enki@gmail.com", '123123123', error => {
    if (error) {
        console.log(error)
            
            return
    }

console.log('User registered 👍')
})

// to run the test run "node logic/registerUser.js"