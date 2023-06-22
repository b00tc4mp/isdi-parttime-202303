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

        const indexFavPost = user.favPosts.indexOf(postId)

        if (indexFavPost < 0) {
            user.favPosts.push(postId)
        } else {
            user.favPosts.splice(indexFavPost, 1)
        }

        json = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            if (error) {
                callback(error)

                return
            }

            callback(null)

        })

    })
}