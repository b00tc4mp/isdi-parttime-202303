require('dotenv').config()

const { readFile } = require('fs')
const { validators: { validateEmail, validatePassword, validateCallback } } = require('com')

module.exports = function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.email === email)

        if (!user) {
            callback(new Error(`user with email ${email} not found`))

            return
        }

        if (user.password !== password) {
            callback(new Error('Incorrect user or password'))

            return
        }

        callback(null, user.id)
    })

}