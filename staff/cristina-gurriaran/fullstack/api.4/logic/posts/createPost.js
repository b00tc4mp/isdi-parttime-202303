require('dotenv').config()
const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateText, validateCallback } } = require('com')


module.exports = function createPost(userId, image, location, title, text, callback){
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.id === userId)

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
            const lastPost = posts[posts.length - 1]
            let id = 'post-1'
    
            if (lastPost)
                id = `post-${parseInt(lastPost.id.slice(5)) + 1}`
        
            const post = {
                id,
                author: userId,
                image,
                location,
                title,
                text,
                date: new Date,
                likes:[]
            }
        
            posts.push(post)

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                if(error){
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}