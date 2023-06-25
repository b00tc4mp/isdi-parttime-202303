import fs from "fs"
import { validateCallback, validateId } from "../../com/validators.js"

export default function toggleFavPost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
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

            const post = posts.find(post => post.id === postId)

            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (post.author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            }

            if (post.hidden === false) {
                post.hidden = true
            } else {
                post.hidden = false
            }

            json = JSON.stringify(posts)

            fs.writeFile('../data/posts.json', json, 'utf-8', error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)
            })
        })
    })
}