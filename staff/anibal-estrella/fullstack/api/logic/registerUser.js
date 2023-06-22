// 1. call context.js to load your db in memory
const context = require('./context')
const { validators: { validateName, validateEmail, validatePassword } } = require('com')

// 2. create function with the parameters it receives
module.exports = (name, email, password, repeatPassword) => {
    validateEmail(email)
    validateName(name)
    validatePassword(password)
    validatePassword(repeatPassword)

    // 3. load the database to fill it inside the context
    const { users } = context

    // 3- send a promise to the handlers/registerUserHandler.js
    return users.insertOne({ name, email, password, repeatPassword })
}