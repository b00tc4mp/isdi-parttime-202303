const { readFile, writeFile } = require('fs') //commonJS

const { validators: { validateText, validateUrl, validateId, validateCallback } } = require('com')

module.exports = (userId, text, image, callback) => {
    validateId(userId, 'user id')
    validateText(text, 'Post text')
    validateUrl(image, 'Image URL')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)
            return

        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with email ${userId} does not exist`))
            return

        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) return callback(error)


            const posts = JSON.parse(json)

            const lastPost = posts[posts.length - 1]

            let id = 'post-1'

            if (lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: new Date,
                likes: []
            }

            posts.push(post)

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) return callback(error)

                callback(null)
            })
        })

    })
}

