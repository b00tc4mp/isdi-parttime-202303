const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function getLoggedUser(userId, callback) {
    validateId(userId)
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

        const _user = {
            name: user.name
        }

        // si const { validators:o el DEFAULTAVATAR JA NO FARA FALTA
        if (user.avatar) {
            _user.avatar = user.avatar
        }

        callback(null, _user)
    })
}