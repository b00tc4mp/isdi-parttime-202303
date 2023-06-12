const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')
const retrievePost = require('./retrievePost')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function toggleLikePost(userId, postId, callback) {
    validateId(userId)
    validateCallback(callback)

    retrieveUser(userId, (error, currentUser) => {
        if (error) {
            console.error(error)

            return
        }

        retrievePost(currentUser.id, postId, (error, postToUpdate) => {
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
                const postIndex = posts.findIndex(post => post.id === postToUpdate.id)
                const index = posts[postIndex].likes.indexOf(currentUser.id)

                if (index < 0) {
                    posts[postIndex].likes.push(currentUser.id)
                }
                else {
                    posts[postIndex].likes.splice(index, 1)
                }

                const postsToFile = JSON.stringify(posts);

                writeFile('./data/posts.json', postsToFile, 'utf8', error => {
                    if (error) {
                        callback(error)

                        return
                    }
                    console.log("Like actualizado");
                    
                })
            })
        })
    }
    )
callback(null)
}