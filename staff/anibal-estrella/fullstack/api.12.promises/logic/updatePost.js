require('dotenv').config()
const { readFile, writeFile } = require('fs') //commonJS
const { validators: { validateText, validateUrl, validateId, validateCallback } } = require('com')

/**
 * Updates post and updates the post in DB
 * @param {*} userId the user's ID
 * @param {*} text  the Post's text
 * @param {*} image the Post's image
 */


module.exports = (userId, postId, image, text, callback) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'Image URL')
    validateText(text, 'Post text')
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

            post.image = image
            post.text = text
            post.date = new Date

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) return callback(error)

                callback(null)
            })
        })

    })
}

