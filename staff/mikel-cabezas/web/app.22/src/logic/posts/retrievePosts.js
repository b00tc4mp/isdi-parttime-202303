import { posts, users } from '../../data.js'
import { validateId } from "../helpers/validators.js";

export default function retrievePosts(userId) {

    validateId(userId)

    const found = users().some(user => user.id === userId)
    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts().toReversed()
}