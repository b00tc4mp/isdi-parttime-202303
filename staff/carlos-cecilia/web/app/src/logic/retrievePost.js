import { validateId } from './helpers/validators'
import { users } from '../data'
import { findPostById } from './helpers/data-managers'

export default function retrievePosts(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const found = users().some(user => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    return post
}