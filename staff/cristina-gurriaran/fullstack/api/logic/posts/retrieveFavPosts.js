const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveFavPosts(userId, callback){
    validateId (userId, 'user id')
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
            const _posts = posts.filter(post => user.favs.includes(post.id))

            callback(null, _posts)
        })
    })
}