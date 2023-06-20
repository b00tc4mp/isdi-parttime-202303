const toggleLikePost = require('./toggleLikePost')

const { readFile } = require('fs') //commonJS
require('dotenv').config()

readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    const users = JSON.parse(json)
    const user = users[users.length - 1]

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        if (error) return callback(error)

        const posts = JSON.parse(json)
        const post = posts[posts.length - 1]

        toggleLikePost(user, post.id, error => {
            if (error) {
                console.error(error)
                return
            }

            console.log('post updated!')
        })

    })
})