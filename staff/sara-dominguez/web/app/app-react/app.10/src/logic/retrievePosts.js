console.log('load retrievePost')

import { validateId, validateCallback } from "./helpers/validators.js"
import { loadUsers, loadPosts } from "../data.js"

export default function retrievePosts(userId, callback) {
    validateId(userId)
    validateCallback(callback)

    loadUsers(users => {
        users.some(user => user.id === userId)

        if (!users) {
            callback(new Error(`User with ${userId} not found`))

            return
        }

        loadPosts(posts => {
            callback(null, posts.toReversed())
        })
    })
}