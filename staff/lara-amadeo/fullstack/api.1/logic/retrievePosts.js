const { readFile } = require('fs')

module.exports = function retrievePosts(userId, callback) {
    readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`User with id ${userId} not found`))
            return
        }

        readFile('./data/posts.json', (error, json) => {
            if (error) {
                callback(error)

                return
            }

            const posts = JSON.parse(json)
            
            posts.forEach(post => {
                post.favs = user.savedPosts.includes(post.id)

                const _user = users.find(user => user.id === post.author)

                post.author = {
                    id: _user.id,
                    username: _user.username,
                    avatar: _user.avatar
                }
            })

            callback(null, posts)
        })
    })
}