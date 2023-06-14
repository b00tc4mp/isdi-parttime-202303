require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateEmail, validateName, validatePassword } } = require('com')
// const { validators:ar el default avatar: punLogo
// falta el password confirm

module.exports = function registerUser(name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`user with email ${email} already exists`))

            return
        }

        let id = 'user-1'

        const lastUser = users[users.length - 1]

        if (lastUser)
            id = `user-${parseInt(lastUser.id.slice(5)) + 1}`

        user = {
            id,
            name,
            email,
            password,
            //avatar: DEFAULTAVATAR
            avatar: null,
            favs: []
        }

        users.push(user)

        json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}