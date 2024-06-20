const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function updateUserMode(userId, mode, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        user.mode = mode

        json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}