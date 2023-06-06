const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePost(userId, postId, callback){
    validateId (userId, 'user id')
    validateId (postId, 'post id')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)
        
        if(!user){
            callback(error)
            return
        }

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }

            const posts = JSON.parse(json)
            const post = posts.find(post => post.author === user.id)

            if(!post){
                callback(error)
                return
            }


            callback(null, post)
        })

    })
}
