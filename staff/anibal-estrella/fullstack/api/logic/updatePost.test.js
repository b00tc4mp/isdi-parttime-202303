const updatePost = require('./updatePost')

const { readFile } = require('fs') //commonJS
require('dotenv').config()


readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
    if (error) return callback(error)

    const posts = JSON.parse(json)
    const post = posts[posts.length - 1]
    const image = 'NEW-https://picsum.photos/1500?random=1'
    const text = 'NEW-post text'

    updatePost('user-1', post.id, text, image, error => {
        if (error) {
            console.error(error)
            return
        }

        console.log('post updated!')
    })

})