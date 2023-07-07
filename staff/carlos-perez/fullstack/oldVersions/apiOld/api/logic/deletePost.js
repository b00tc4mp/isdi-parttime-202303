const { readFile, writeFile } = require('fs')
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

function retrievePost(userId, postId, callback){
    validateId(userId)
    validateCallback(callback)
    readFile('./data/users.json', 'utf8', (error, filedUsers) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(filedUsers)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        readFile('./data/posts.json', 'utf8', (error, filedPosts) => {
            if (error) {
                callback(error)
    
                return
            }
            const posts = JSON.parse(filedPosts)

            const post=posts.find(post=> post.id===postId)

            if(!post){
                callback(new Error(`Post with id ${postId} not found`))

            return
            }

            callback(null, post)
        })
        
    })
}