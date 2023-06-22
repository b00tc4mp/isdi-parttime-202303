require('dotenv').config()
const { readFile } = require('fs')
const { validators: { validateUserId, validateCallback } } = require('com')

module.exports = (userId, callback) => {
    validateUserId(userId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
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

        const { name, email, image, favPosts } = user

        const user2 = { name, email, image, favPosts }

        callback(null, user2)


    })


}