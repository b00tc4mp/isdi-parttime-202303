import { validateId } from './helpers/validators'
import { users, posts } from '../data'

/**
 * Retrieves all posts from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {string array} All posts sorted by creation
 */

export default function retrievePosts (userId) {
  validateId(userId, 'User ID')

  const found = users().some((user) => user.id === userId)

  if (!found) throw new Error(`User with ID ${userId} not found`)

  return posts().toReversed() // TODO toSorted (para que se ordenen por fecha)
}
