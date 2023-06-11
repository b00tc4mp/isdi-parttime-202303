const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')
const retrievePost = require('./retrievePost')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function deletePost(userId, postId, callback) {
    validateId(userId)
    validateCallback(callback)

    retrieveUser(userId, (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        if (user) {
            retrievePost(userId, postId, (error, postToDelete) => {
                if (error) {
                    console.error(error)

                    return
                }

                readFile('./data/posts.json', 'utf8', (error, filedPosts) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    const posts = JSON.parse(filedPosts);
                    const index = posts.findIndex(post => post.id === postToDelete.id);
                    posts.splice(index, 1);
                    const postToFile = JSON.stringify(posts);

                    writeFile('./data/posts.json', postToFile, 'utf8', error => {
                        if (error) {
                            callback(error)

                            return
                        }
                        console.log("Post borrado");
                        callback(null)
                    })
                })
            })
        }
    })

}