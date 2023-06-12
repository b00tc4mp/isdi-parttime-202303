const { readFile, writeFile } = require('fs')
const { validators: { validateText, validateEmail, validatePassword, validateCallback } } = require('com')


module.exports = function registerUser(username, email, password, callback) {

    validateText(username)
    validateEmail(email)
    validatePassword(password)
    validateCallback(callback)


    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`User with email ${email} already exists`))

            return
        }

        let id = 'user-1'
        const lastUser = users[users.length - 1]

        if (lastUser)
            id = `user-${(Number(lastUser.id.slice(5)) + 1)}`

        user = {
            id,
            username,
            email,
            password,
            avatar: null,
            likedPosts: [],
            savedPosts: []
        }

        users.push(user)

        json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            if (error) {
                callback(error)
                return
            }

            callback(null)
        })
    })
}