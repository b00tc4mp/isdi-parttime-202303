console.log('load retrievePost')

import { validateId } from "./helpers/validators.js"
import { users, posts } from "../data.js"

export default function retrievePosts(userId) {
    validateId(userId)

    const foundUser = users().some(user => user.id === userId)

    if(!foundUser) throw new Error(`User with ${userId} not found`)

    return posts().toReversed() 
}