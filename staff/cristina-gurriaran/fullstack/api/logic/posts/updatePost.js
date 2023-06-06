const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateUrl, validateText, validateCallback } } = require('com')


module.exports = function updatePost (userId, postId, image, location, title, text, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
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

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }
    
            const posts = JSON.parse(json)
            let post = posts.find(post => postId === post.id)

            if (!post){
                callback(new Error(`post with id ${postId} not found`))
                return
            } 

            if (post.author !== userId){
                callback(new Error (`post with id ${postId} does not belong to user with id ${userId}`))
                return
            }  

            post.image = image
            post.location = location
            post.title = title
            post.text = text
            post.date = new Date


        })
    })    
}