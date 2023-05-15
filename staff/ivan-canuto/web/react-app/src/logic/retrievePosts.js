import { users, posts } from "../data"
import { validateId } from "./helpers/validators"

/**
 * Retrieves the posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of posts from database
*/

export function retrievePosts(userId) {
  const usersApp = users()
  const postsApp = posts()

  validateId(userId, 'user id')

  let user = usersApp.some(user => user.id === userId)

  if (!user) throw new Error(`User with ${userId} not found.`)

  return postsApp.toReversed()
}
