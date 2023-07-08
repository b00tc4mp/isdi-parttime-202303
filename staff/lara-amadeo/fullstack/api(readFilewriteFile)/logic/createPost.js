const { readFile, writeFile } = require('fs')

module.exports = function createPost(userId, image, text, callback) {

    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
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

        readFile('./data/posts.json', 'utf-8', (error, data) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(data)

            let newPost
            if (posts.length === 0) {
                newPost = {
                    id: 'post-1',
                    author: userId,
                    image,
                    text,
                    date: new Date,
                    visibility: 'private',
                    price: 0,
                    likes: []
                }
            } else {
                const lastPostId = posts[posts.length - 1].id
                const newPostId = `post-${Number((lastPostId).slice(5)) + 1}`

                newPost = {
                    id: newPostId,
                    author: userId,
                    image,
                    text,
                    date: new Date,
                    visibility: 'private',
                    price: 0,
                    likes: []
                }
            }

            posts.push(newPost)

            data = JSON.stringify(posts)

            writeFile('./data/posts.json', data, error => {
                if (error) {
                    callback(error)
                    return
                }

                callback(null)
            })
        })
    })
}