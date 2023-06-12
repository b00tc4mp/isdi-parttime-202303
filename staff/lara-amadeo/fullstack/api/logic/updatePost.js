const { readFile, writeFile } = require('fs')

module.exports = function updatePost(userId, postId, image, text, callback) {

    let posts
    let post
    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        readFile('./data/posts.json', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            posts = JSON.parse(json)

            post = posts.find(post => post.id === postId)

            if(!post){
                callback(new Error('Post not found'))
                return
            }

            if(post.author !== userId){
                callback(new Error(`Post with id ${post.id} does not belong to user with id ${user.id}`))
                return
            }

            post.image = image ? image : post.image
            post.text = text

            json = JSON.stringify(posts)

            writeFile('./data/posts.json', json, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}