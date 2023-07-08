const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')
require('dotenv').config()


module.exports = (userId, postId, callback) => {
    validateId(userId, 'user Id')
    validateId(postId, 'post id')
    validateCallback(callback, 'callback function')

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User not found in the DB! 👎`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            let post = posts.find(post => post.id === postId)
            if (!post) {
                callback(new Error(`Post not found in DB! 👎`))

                return
            }

            callback(null, post)

        })
    })
}