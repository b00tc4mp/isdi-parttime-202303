require('dotenv').config()
const { readFile, writeFile } = require('fs')
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

        const likedPostIndex = user.favPosts.findIndex(liked => liked === postId)
        user.favPosts.splice([likedPostIndex], 1)


        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }
            const posts = JSON.parse(json)

            const post = posts.find(post => post.id === postId)
            const postIndex = posts.findIndex(post => post.id === postId)

            posts.splice([postIndex], 1)

            // posts.push(editedPost)

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)

            })
        })
    })
}