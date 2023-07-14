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

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }
            const posts = JSON.parse(json)

            posts.forEach(post => {
                const user = users.find(user => user.id === post.author)

                post.author = {
                    id: user.id,
                    name: user.name,
                    image: user.image
                }
            })

            callback(null, posts.reverse());
        })
    })
}