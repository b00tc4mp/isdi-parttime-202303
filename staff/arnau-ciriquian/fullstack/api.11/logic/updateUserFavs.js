const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function updateUserFavs(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/posts.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const posts = JSON.parse(json)

        readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
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

            const favorites = []

            user.favs.forEach(postId => {
                if (posts.findIndex(post => post.id === postId) !== -1) {
                    favorites.push(postId)
                }
            })

            user.favs = favorites

            json = JSON.stringify(users)

            writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}