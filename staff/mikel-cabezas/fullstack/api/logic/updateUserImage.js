const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validateImage, validateCallback } } = require('com')

module.exports = (userId, avatar, callback) => {
    validateUserId(userId)
    validateCallback(callback)

    readFile('./data/users.json', (error, json) => {
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

        console.log('json2', json2)

        writeFile('./data/user.json', json2, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)
        })
        const { name, email, image } = user

        const user2 = { name, email, image }

        callback(null, user2)


    })


}