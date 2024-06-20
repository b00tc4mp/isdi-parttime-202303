require('dotenv').config()
const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrievePosts(userId, callback){
    validateId (userId, 'user id')
    validateCallback(callback)

    let posts

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }

            posts = JSON.parse(json)
            posts.forEach(post => {
                post.fav = user.favs.includes(post.id)
            
                const _user = users.find(user => user.id === post.author)

                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })
            
            callback(null, posts) 
        })
    })
}