console.log('load retrievePost')

import { validateId } from "./helpers/validators.js"
import { loadUsers, posts } from "../data.js"

export default function retrievePosts(userId, callback) {
    validateId(userId)

    loadUsers(users => {
        users.some(user => user.id === userId)

        if (!users) {
            callback(new Error(`User with ${userId} not found`))

            return
        }

        callback(null, posts.toReversed())
    })
}