const { readFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveUser(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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

        const tmpuser = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            favs: user.favs,
            mode: user.mode
        }

        callback(null, user)
    })

}