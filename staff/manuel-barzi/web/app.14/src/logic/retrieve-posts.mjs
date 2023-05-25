import { validateId } from './helpers/validators.mjs'
import { users, posts } from '../data.mjs'

export default function retrievePosts(userId) {
    validateId(userId, 'use id')

    const found = users.some(user => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts.toReversed()
}