require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validateText, validateCallback } } = require('com')

module.exports = (userId, avatar, callback) => {
    validateUserId(userId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found`))

            return
        }

        user.image = avatar
        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })


}