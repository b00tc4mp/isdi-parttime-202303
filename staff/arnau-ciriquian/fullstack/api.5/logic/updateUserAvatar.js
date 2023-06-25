const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateUrl, validateId } } = require('com')

module.exports = function updateUserAvatar(userId, avatar, callback) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    readFile('../data/users.json', 'utf-8', (error, json) => {
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

        json = JSON.stringify(users)

        writeFile('../data/users.json', json, 'utf-8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
    })
}