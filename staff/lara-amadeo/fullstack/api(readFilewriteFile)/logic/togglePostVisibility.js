const { readFile, writeFile } = require('fs')

module.exports = function toggleLikePost(userId, postId, callback) {
    let users
    let user
    let posts
    let post
    readFile(`${process.env.DB_PATH}/users.json`, (error, usersJson) => {
        if (error) {
            callback(error)

            return
        }

        users = JSON.parse(usersJson)

        user = users.find(user => user.id === userId)

        if (!user) {
            callback(`User with id ${userId} not found`)

            return
        }

        readFile('./data/posts.json', (error, postsJson) => {
            if (error) {
                callback(error)

                return
            }

            posts = JSON.parse(postsJson)

            post = posts.find(post => post.id === postId)

            if (!post) {
                callback(`Post with id ${postId} not found`)

                return
            }

            if (post.visibility === 'private') {
                post.visibility = 'public'

                postsJson = JSON.stringify(posts)

                writeFile('./data/posts.json', postsJson, error => {
                    if (error) {
                        callback(error)
                        return
                    }

                    callback(null)
                })
            } else {
                post.visibility = 'private'

                postsJson = JSON.stringify(posts)

                writeFile('./data/posts.json', postsJson, error => {
                    if (error) {
                        callback(error)
                        return
                    }

                    callback(null)
                })
            }
        })
    })
}