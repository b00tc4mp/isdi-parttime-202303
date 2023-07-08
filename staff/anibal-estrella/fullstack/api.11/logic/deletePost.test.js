const deletePost = require('./deletePost')
const { readFile } = require('fs') //commonJS
require('dotenv').config()


readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
    if (error) return callback(error)

    const posts = JSON.parse(json)
    const post = posts[posts.length - 1];

    deletePost('user-1', post.id, error => {
        if (error) {
            console.error(error)
            return
        }

        console.log('post deleted!')
    })

})

