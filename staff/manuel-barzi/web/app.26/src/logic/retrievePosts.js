import { validateId } from './helpers/validators'
import { users, posts } from '../data'

export default function retrievePosts(userId) {
    validateId(userId, 'user id')

    const found = users().some(user => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts().toReversed()
}