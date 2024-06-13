const { readFile } = require('fs')
const { validators: { validateCallback, validateId } } = require('com')

module.exports = function retrivePosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

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

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf-8', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            posts.forEach(post => {
                post.fav = user.favs.includes(post.id)

                const _user = users.find(user => user.id === post.author)

                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })

            callback(null, posts.reverse())
        })
    })
}