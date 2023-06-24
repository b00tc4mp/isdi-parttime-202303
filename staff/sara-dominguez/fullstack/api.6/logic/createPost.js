const { readFile, writeFile } = require('fs')
const { validators: { validateId, validatePostUrl, validateText, validateCallback } } = require('com')

module.exports = function createPost(userId, image, text, callback) {
    validateId(userId)
    validatePostUrl(image)
    validateText(text)
    validateCallback(callback)



    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with email ${email} not found`))

            return
        }



        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
            if (error) {
                callback(error)

                return
            }
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
                date: new Date(),
                likes: []
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
    })
}