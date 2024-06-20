const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateUrl, validateText, validateCallback } } = require('com')

module.exports =  function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text, 'text')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)
    
                return
            }
    
            const posts = JSON.parse(json)

            let id = 'post-1'

            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = `post-${parseInt(lastPost.id.slice(5)) + 1}`

            posts.push({
                id: id,
                author: userId,
                image,
                text,
                date: new Date,
                dateLastModified: '',
                likes: [],
                lock: false,
                price: 0
            })

            json = JSON.stringify(posts)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })


}