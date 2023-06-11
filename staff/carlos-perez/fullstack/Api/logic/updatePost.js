const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')
const retrievePost = require('./retrievePost')
const { validators: { validateId, validateText, validateCallback } } = require('com')

module.exports = function updatePost(userId, postId, image, text, callback) {
    validateId(userId)
    validateText(text)
    validateCallback(callback)

    retrieveUser(userId, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        retrievePost(user.id, postId, (error, postToUpdate) => {
            if (error) {
                callback(error)

                return
            }

            if (postToUpdate.author !== user.id) {
                callback(new Error('El usuario no tiene permiso para modificar este post'))
                return
            }


            readFile('./data/posts.json', 'utf8', (error, filedPosts) => {
                if (error) {
                    callback(error)

                    return
                }

                const posts = JSON.parse(filedPosts);
                const index = posts.findIndex(post => post.id === postToUpdate.id);
                postToUpdate.image = image;
                postToUpdate.text = text;
                postToUpdate.date = new Date();
                posts.splice(index, 1);
                posts.splice(index, 0, postToUpdate)
                const postToFile = JSON.stringify(posts);

                writeFile('./data/posts.json', postToFile, 'utf8', error => {
                    if (error) {
                        callback(error)

                        return
                    }
                    console.log("Post actualizado");
                    callback(null)
                })
            })
        })
    }
    )

}