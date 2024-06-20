const { readFile } = require('fs')

const { validators: { validateEmail, validatePassword, validateCallback } } = require('com')

/**
 * Authenticates a user by email and password
 * 
 * @param {string} email The user's email
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */

module.exports = function authenticateUser(email, password, callback) {
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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
            callback(new Error('wrong credentials'))

            return
        }


 //setTimeout(() => {
        callback(null, user.id)
  //}, 5000)
    })
}