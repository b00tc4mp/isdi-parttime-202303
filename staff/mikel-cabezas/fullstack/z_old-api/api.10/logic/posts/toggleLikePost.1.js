require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validatePostId, validateCallback } } = require('com')
module.exports = (userId, postId, callback) => {
    validateUserId(userId)
    validatePostId(postId)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }
        const posts = JSON.parse(json)
        const post = posts.find(post => post.id === postId)
        const indexLikedPost = post.likes.indexOf(userId)

        if (indexLikedPost < 0) {
            post.likes.push(userId)
        } else {
            post.likes.splice(indexLikedPost, 1)
        }

        json = JSON.stringify(posts, null, 4)

        writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)

        })
    })
}