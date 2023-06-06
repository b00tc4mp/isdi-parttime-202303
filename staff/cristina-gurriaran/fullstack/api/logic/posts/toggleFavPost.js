const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function toggleFavPost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    let user

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        } 

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }
    
            const posts = JSON.parse(json)
            let post = posts.find(post => post.id === postId)

            if (!post){
                callback(new Error(`user with id ${postId} not found`))
                return
            } 

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else
                user.favs.splice(index, 1)

            users.push(user)
            json = JSON.stringify(user, null, 4)

            writeFile('./data/users.json', json, 'utf8', error => {
                if(error){
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })

}