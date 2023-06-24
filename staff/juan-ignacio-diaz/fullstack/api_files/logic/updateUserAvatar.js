const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateCallback } } = require('com')

module.exports = function updateUserAvatar(userId, avatar, callback) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar')
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

        user.avatar = avatar

        const json2 = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json2, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}