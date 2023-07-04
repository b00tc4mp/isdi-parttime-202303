require('dotenv').config()
const { readFile, writeFile } = require('fs') //commonJS
const { validators: { validateId, validateCallback } } = require('com')

/**
 * 
 * @param {*} userId 
 * @param {*} postId 
 * @param {*} callback 
 */

module.exports = (userId, postId, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with the ID: "${userId}" does not exist. 👎`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) return callback(error)

            const posts = JSON.parse(json)
            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`Post with the ID: "${postId}" does not exist. 👎`))

                return
            }

            const index = post.likes.indexOf(userId)

            json = JSON.stringify(posts, null, 4)

            if (index < 0)
                post.likes.push(userId);

            else
                post.likes.splice(index, 1)

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) return callback(error)

                callback(null)
            })
        })

    })
}