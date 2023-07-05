const { readFile } = require('fs')

const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveSavePosts(userId, callback){
    validateId(userId, 'user id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
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

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)

            const tmPosts = posts.filter(post => (user.favs.includes(post.id)))

            tmPosts.forEach(post => {
                post.fav = user.favs.includes(post.id)
                post.date = new Date(post.date);
                post.dateLastModified = new Date(post.dateLastModified);

                const author = users.find(user => user.id === post.author)

                if (author)
                    post.author = {
                        id: author.id,
                        name: author.name,
                        avatar: author.avatar
                    }
            })

            //callback(null, tmPosts.toReversed())
            callback(null, tmPosts)
        })
    })
}