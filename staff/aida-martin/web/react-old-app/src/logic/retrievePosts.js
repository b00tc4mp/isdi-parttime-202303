import { validateId } from './helpers/validators'
import { users, posts } from '../data'

export default function retrievePosts (userId) {
  validateId(userId, 'User ID')

  const found = users().some((user) => user.id === userId)

  if (!found) throw new Error(`User with ID ${userId} not found`)

  return posts().toReversed() // TODO toSorted (para que se ordenen por fecha)
}
