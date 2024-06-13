import fs from "fs"
import { validateCallback, validateId, validateUrl, validateText } from "../../com/validators.js"

export default function createNewPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)
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

            let id = 'post-1'

            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: (new Date).toLocaleString('en-UK'),
                likes: [],
                hidden: false
            }

            posts.push(post)

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