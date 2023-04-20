import { validateId } from './helpers/validators.js'
import { users, posts } from '../data.js'

export default function retrievePosts(userId) {
    validateId(userId, 'use id')

    const found = users.some(user => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts.toReversed()
}