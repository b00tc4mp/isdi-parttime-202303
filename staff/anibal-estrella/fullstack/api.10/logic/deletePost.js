require('dotenv').config()
const { readFile, writeFile } = require('fs') //commonJS
const { validators: { validateId, validateCallback } } = require('com')


/**
 * Deletes a post and all its data, updates data in the database (users, posts)
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
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
            callback(new Error(`User with id ${userId} does not exists`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) return callback(error)

            const posts = JSON.parse(json)
            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`Post with id ${postId} does not exists`))

                return
            }

            if (post.author !== userId) {
                callback(new Error(`Post with id ${postId} does not exists belongs to user ${userId}`))

                return
            }

            const index = posts.findIndex(post => post.id === postId)

            posts.splice(index, 1)

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) return callback(error)

                callback(null)
            })

            users.forEach((user) => {
                const index = user.favs.indexOf(postId);

                if (index !== -1) {
                    user.favs.splice(index, 1);
                }
            })

            json = JSON.stringify(users, null, 4)

            writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
                if (error) return callback(error)

                callback(null)
            })
        })

    })
}

