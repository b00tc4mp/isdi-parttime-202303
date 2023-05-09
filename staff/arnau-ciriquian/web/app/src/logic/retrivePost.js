import { users } from "../data";
import { validateId } from "./helpers/validators";
import { findPostById }from "./helpers/data-managers"

export default function retrievePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const user = users().some(user => user.id === userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)
    
    return post
}