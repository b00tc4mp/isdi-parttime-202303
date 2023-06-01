const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

module.exports = function createPost(userId, image, text, callback) {

    retrieveUser(userId, (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        if (user) {

            readFile('../data/posts.json', 'utf8', (error, filedPosts) => {
                if (error) {
                    callback(error)

                    return
                }
                const posts = JSON.parse(filedPosts);
                const post = {
                    id: userId + '-' + Date.now(),
                    author: userId,
                    image: image,
                    text: text,
                    date: Date.now(),
                    likes: []
                }
                posts.push(post);

                const postToFile = JSON.stringify(posts);

                writeFile('../data/posts.json', postToFile, 'utf8', error => {
                    if (error) {
                        callback(error)

                        return
                    }
                    console.log("Post guardado");
                    callback(null)
                })
            }

            )
        }
    })


}