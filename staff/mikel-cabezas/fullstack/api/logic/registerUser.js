const { readFile, writeFile } = require('fs')
const { validators: { validateName, validateEmail, validatePassword, validateCallback } } = require('com')
module.exports = function registerUser(name, email, password, callback) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)

    readFile('./data/users.json', (error, json) => {
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

        name = name.trim()
        user = {
            id: `user-${parseInt(users.length + 1)}`,
            name: name,
            email: email,
            password: password,
            image: null,
            favPosts: []
        }

        users.push(user)

        json = JSON.stringify(users, null, 4)

        writeFile('./data/users.json', json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)

        })
    })
}