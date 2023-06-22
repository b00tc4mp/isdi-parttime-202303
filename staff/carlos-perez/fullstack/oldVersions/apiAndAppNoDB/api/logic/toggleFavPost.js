const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')


module.exports = function toggleFavPost(userId, postId, callback) {
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

            readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, filedUsers) => {
                if (error) {
                    callback(error)

                    return
                }

                const users = JSON.parse(filedUsers);
                const userIndex = users.findIndex(user => user.id === currentUser.id)
                const index = users[userIndex].favs.indexOf(postToUpdate.id)

                if (index < 0) {
                    users[userIndex].favs.push(postToUpdate.id)
                }
                else {
                    users[userIndex].favs.splice(index, 1)
                }

                const usersToFile = JSON.stringify(users);

                writeFile(`${process.env.DB_PATH}/users.json`, usersToFile, 'utf8', error => {
                    if (error) {
                        callback(error)

                        return
                    }
                    console.log("Favorito actualizado");
                })
            })
        })
    }
    )

}

function retrieveUser(userId, callback){
    validateId(userId)
    validateCallback(callback)
    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
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
    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, filedUsers) => {
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

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, filedPosts) => {
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