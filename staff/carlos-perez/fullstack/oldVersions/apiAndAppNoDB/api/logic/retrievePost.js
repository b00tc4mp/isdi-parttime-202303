const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePost(userId, postId, callback){
    validateId(userId)
    validateCallback(callback)
    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, filedUsers) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(filedUsers)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, filedPosts) => {
            if (error) {
                callback(error)
    
                return
            }
            const posts = JSON.parse(filedPosts)

            const post=posts.find(post=> post.id===postId)

            if(!post){
                callback(new Error(`Post with id ${postId} not found`))

            return
            }

            callback(null, post)
        })
        
    })
}