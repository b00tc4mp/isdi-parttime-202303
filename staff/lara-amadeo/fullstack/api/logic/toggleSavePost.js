const { readFile, writeFile } = require('fs')

module.exports = function toggleSavePost(userId, postId, callback) {

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

            if (!user.savedPosts.includes(post.id)) {
                user.savedPosts.push(post.id)

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
            } else {
                const index = user.savedPosts.findIndex(elem => elem === post.id)
                user.savedPosts.splice(index, 1)

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
            }
        })
    })
}