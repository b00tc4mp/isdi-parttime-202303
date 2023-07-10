const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validateText, validateCallback } } = require('com')

module.exports = (userId, avatar, callback) => {
    validateUserId(userId)
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
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
        const json2 = JSON.stringify(users)

        writeFile('./data/users.json', json2, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })


}