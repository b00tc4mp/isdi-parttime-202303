require('../../../api.6/node_modules/dotenv/lib/main').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function toggleLikePost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        } 

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }
    
            const posts = JSON.parse(json)
            const post = posts.find(post => post.id === postId)

            if (!post){
                callback(new Error(`user with id ${postId} not found`))
                return
            } 

            if (!post.likes) {
                post.likes = [userId]

            } else {
                const index = post.likes.indexOf(userId)

                if (index < 0) 
                    post.likes.push(userId)

                else
                    post.likes.splice(index, 1)

                    if (!post.likes.length) delete post.likes
                    
            }

            const json2 = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json2, 'utf8', error => {
                if(error){
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}