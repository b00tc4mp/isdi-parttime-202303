const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateUrl, validateText, validateCallback } } = require('com')

module.exports = function updatePost(userId, postId, image, text, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

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

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
    
                return
            }

            if (user.id !== post.author){
                callback(new Error(`Post doesn't belong to this user`))

                return
            }  

            if(image !== '') post.image = image
            if(text !== '') post.text = text
            post.dateLastModified = new Date

            json = JSON.stringify(posts)                

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