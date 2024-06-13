import fs from "fs"
import { validateCallback, validateId } from "../../com/validators.js"

export default function deletePost(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    fs.readFile('../data/users.json', 'utf-8', (error, json) => {
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

        fs.readFile('../data/posts.json', 'utf-8', (error, json) => {
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