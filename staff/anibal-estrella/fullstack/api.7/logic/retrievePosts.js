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

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            posts.forEach(post => post.date = new Date(post.date))

            callback(null, posts.reverse())
        })
    })
}