require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validateText, validatePassword, validateCallback } } = require('com')
module.exports = (userId, image, title, text, location, callback) => {
    validateUserId(userId)
    validateText(title)
    validateText(text)
    validateCallback(callback)

    console.log(process.env.DB_PATH)

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }
        const posts = JSON.parse(json)

        const currentPost = parseInt(posts.length + 1)

        const post = {
            id: 'post-' + currentPost,
            author: userId,
            image: image,
            title: title,
            text: text,
            date: new Date(),
            comments: [],
            likes: [],
            visibility: 'public',
            location: ''
        }

        posts.push(post)

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