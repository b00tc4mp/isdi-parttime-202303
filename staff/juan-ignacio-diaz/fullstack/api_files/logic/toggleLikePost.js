const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function toggleLikePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
    
                return
            }

            const index = post.likes.indexOf(userId)
        
            if (index < 0)
                post.likes.push(userId)
            else 
                post.likes.splice(index, 1)

            json = JSON.stringify(posts)                

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) {
                    callback(error)
    
                    return
                }
    
                callback(null)
            })
        })
    })
}



