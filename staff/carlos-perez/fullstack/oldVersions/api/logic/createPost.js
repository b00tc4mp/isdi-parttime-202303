const { readFile, writeFile } = require('fs')

const { validators: { validateId, validateText, validateCallback } } = require('com')


module.exports = function createPost(userId, image, text, callback) {
    validateId(userId)
    validateText(text)
    validateCallback(callback)

    retrieveUser(userId, (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        if (user) {

            readFile('./data/posts.json', 'utf8', (error, filedPosts) => {
                if (error) {
                    callback(new Error('This file gives me problems'))

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

                writeFile('./data/posts.json', postToFile, 'utf8', error => {
                    if (error) {
                        callback(new Error('I cannot write in this file'))

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

function retrieveUser(userId, callback){
    validateId(userId)
    validateCallback(callback)
    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        const _user={
            name: user.name,
            id: user.id
        }


        callback(null, _user)
    })
}