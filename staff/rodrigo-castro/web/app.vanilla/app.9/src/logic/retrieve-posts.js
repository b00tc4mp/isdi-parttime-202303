import { validateId } from './helpers/validators.js'
import { users, posts } from '../data.js'

export default (userId) => {
    validateId(userId, 'user id')

    const found = users().some(user => user.id === userId)

    if(!found) throw new Error ('User id not valid')

    return posts().toReversed()
}