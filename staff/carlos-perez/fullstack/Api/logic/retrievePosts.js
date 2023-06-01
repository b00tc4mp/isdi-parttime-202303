const { readFile } = require('fs')

module.exports = function retrievePost(userId, callback){
    readFile('../data/users.json', 'utf8', (error, filedUsers) => {
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

        readFile('../data/posts.json', 'utf8', (error, filedPosts) => {
            if (error) {
                callback(error)
    
                return
            }
            const posts = JSON.parse(filedPosts)

            callback(null, posts.toReversed()); //Sólo funciona con Node v20 en adelante
        })
        
    })
}