require('dotenv').config()
const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')


module.exports = (userId, callback) => {
    validateId(userId, 'user Id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found! 👎`))

            return
        }
        // extract properties from user object and declare variables with same values
        const { name, email, avatar } = user
        const user2 = { name, email, avatar }

        callback(null, user2)
    })

}