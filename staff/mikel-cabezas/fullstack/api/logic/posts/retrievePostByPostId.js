require('dotenv').config()
const { readFile } = require('fs')
const { validators: { validateUserId, validatePostId, validateCallback } } = require('com')
module.exports = (userId, postId, callback) => {
    validateUserId(userId)
    validatePostId(postId)
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
            const post = posts.find(post => post.id === postId)



            callback(null, post);
        })
    })
}