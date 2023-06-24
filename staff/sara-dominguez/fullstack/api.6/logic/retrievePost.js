const { readFile, writeFile } = require('fs')
const { validateId, validateCallback } = require('com')

module.exports = function retrievePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error('user not found'))

            return
        }

    })

    readFile(`${process.env.DB_PATH}/posts`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const posts = JSON.parse(json)
        const post = posts.find(postId => post.id === postId)

        if (!post) {
            callback(new Error('post not found'))

            return
        }

        callback(null, post)
    })

}
