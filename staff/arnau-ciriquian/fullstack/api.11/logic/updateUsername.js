const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId, validateName, validatePassword } } = require('com')

module.exports = function updateUsername(userId, oldUsername, newUsername, password, callback) {
    validateId(userId)
    validateName(oldUsername, 'old username')
    validateName(newUsername, 'new username')
    validatePassword(password)
    validateCallback(callback)

    if (newUsername === oldUsername) {
        callback(new Error('new username is equal to old username'))

        return
    }

    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (oldUsername !== user.name) {
            callback(new Error('old username is not correct'))

            return
        }

        if (password !== user.password) {
            callback(new Error('password is not correct'))

            return
        }

        user.name = newUsername

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