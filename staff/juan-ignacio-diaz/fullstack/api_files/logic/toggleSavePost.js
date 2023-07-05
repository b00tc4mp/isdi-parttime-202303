const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function toggleSavePost(userId, postId, callback) {
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

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else {
                user.favs.splice(index, 1)
            } 

            json = JSON.stringify(users)                

            writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
                if (error) {
                    callback(error)
    
                    return
                }
    
                callback(null)
            })
        })
    })
}



