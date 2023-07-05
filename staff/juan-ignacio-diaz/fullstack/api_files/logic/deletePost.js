const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports =  function deletePost(userId, postId, callback) {
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

            const index = posts.findIndex(post => post.id === postId)

            if (index < 0) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (user.id !== posts[index].author){
                callback(new Error(`Post doesn't belong to this user`))

                return
            }  

            posts.splice(index, 1)

            users.forEach(user => { 
                if (user.favs.includes(postId)) 
                    user.favs.splice(user.favs.findIndex(favs => favs === postId), 1)
            })

            json = JSON.stringify(posts)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                if (error) {
                    callback(error)

                    return
                }

                json = JSON.stringify(users)

                writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
                    if (error) {
                        callback(error)
    
                        return
                    }
    
                    callback(null)
                })
            })
        })
    })
}
