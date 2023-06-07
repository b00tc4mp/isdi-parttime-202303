const { readFile } = require('fs')

module.exports = function retrievePost(userId, postId, callback){
    readFile('./data/users.json', 'utf-8', (error, json) => {
        if(error){
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if(!user){
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        readFile('./data/posts.json', (error, json) => {
            if(error){
                callback(error)
    
                return
            }
    
            const posts = JSON.parse(json)
    
            const post = posts.find(post => post.id === postId)

            callback(null, post)
        })
    })
}