const { readFile } = require('fs')
const { validators: { validateEmail, validatePassword, validateCallback } } = require('com')


module.exports = function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callbackify(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if (!user) {
            callback(new Error(`User with email ${email} not found! 👎`))

            return
        }

        if (user.password !== password) {
            callback(new Error('Wrong password 😢'))
            return
        }
        callback(null, user.id)
    })

}