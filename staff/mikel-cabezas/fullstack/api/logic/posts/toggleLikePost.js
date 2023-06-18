require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateUserId, validateText, validatePostId, validateCallback } } = require('com')
module.exports = (userId, postId, title, text, image, visibility, callback) => {
    validateUserId(userId)
    validatePostId(postId)
    validateText(title)
    validateText(text)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }
        const posts = JSON.parse(json)

        const post = posts.find(post => post.id === postId)
        const postIndex = posts.findIndex(post => post.id === postId)
        posts[postIndex] = {
            id: post.id,
            author: post.userId,
            image: image,
            title: title,
            text: text,
            date: new Date(post.date),
            lastModify: new Date(),
            comments: post.comments,
            likes: post.likes,
            visibility: visibility,
            location: post.location
        }

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
}