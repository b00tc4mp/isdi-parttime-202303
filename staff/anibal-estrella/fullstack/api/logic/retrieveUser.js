const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')


module.exports = (userId, callback) => {
    validateId(userId, 'user Id')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callbackify(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found! 👎`))

            return
        }

        const { name, email, avatar } = user
        const user2 = { name, email, avatar }

        callback(null, user2)
    })

}