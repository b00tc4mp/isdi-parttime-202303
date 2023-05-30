import { validateId } from './helpers/validators'
import { posts } from '../data'
import retrieveUser from './retrieveUser'

/**
 * Retrieves user's saved posts of the user from the database
 *
 * @param {string} userId The user's ID
 * @param {boolean} mySavedPosts If it refers to the saved posts or not
 *
 * @returns {string array} Array of user's saved posts
 */

export default function retrieveSavedPosts (userId) {
  validateId(userId, 'User ID')

  const user = retrieveUser(userId)

  if (!user) throw new Error('User ID not found 😥')

  return posts().filter((post) => user.saves?.includes(post.id)).toReversed() // TODO toSorted (para que se ordenen por fecha)
}
