import { validateId, validateCallback } from './helpers/validators'
import { findUserById, loadPosts } from '../data'

/**
 * Retrieves all posts from the database
 *
 * @param {string} userId The user's ID
 *
 * @returns {string array} All posts sorted by creation
 */

export default function retrievePosts (userId, callback) {
  validateId(userId, 'User ID')
  validateCallback(callback)

  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`User with ID ${userId} not found`))

      return
    }

    loadPosts(posts => callback(null, posts.toReversed())) // TODO toSorted (para que se ordenen por fecha)
  })
}
