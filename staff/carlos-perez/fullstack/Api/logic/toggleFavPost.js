const { readFile, writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')
const retrievePost = require('./retrievePost')
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

            readFile('./data/users.json', 'utf8', (error, filedUsers) => {
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

                writeFile('./data/users.json', usersToFile, 'utf8', error => {
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