const { readFile, writeFile } = require('fs')

module.exports = function deletePost(userId, postId, callback) {

    let users
    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, usersJson) => {
        if (error) {
            callback(error)
            return
        }

        users = JSON.parse(usersJson)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(`User with id ${userId} not found`)

            return
        }

        readFile('./data/posts.json', 'utf-8', (error, postsJson) => {
            if (error) {
                callback(error)
                return
            }

            const posts = JSON.parse(postsJson)
            const postIndex = posts.findIndex(post => post.id === postId)
            posts.splice(postIndex, 1)

            users.forEach(user => {
                user.likedPosts.includes(postId) &&
                    user.likedPosts.splice(user.likedPosts.findIndex(elem => elem === postId), 1)
            })

            users.forEach(user => {
                user.savedPosts.includes(postId) &&
                    user.savedPosts.splice(user.savedPosts.findIndex(elem => elem === postId), 1)
            })

            usersJson = JSON.stringify(users)

            writeFile(`${process.env.DB_PATH}/users.json`, usersJson, error => {
                if (error) {
                    callback(error)
                    return
                }

                postsJson = JSON.stringify(posts)

                writeFile('./data/posts.json', postsJson, error => {
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