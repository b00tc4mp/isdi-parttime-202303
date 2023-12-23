const { readFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePost(userId, postId, callback){
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

            post.date = new Date(post.date);
            post.dateLastModified = new Date(post.dateLastModified);

            callback(null, post)
        })
    })
}