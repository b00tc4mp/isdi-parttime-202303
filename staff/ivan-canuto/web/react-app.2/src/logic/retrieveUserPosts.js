import { users, posts } from "../data"
import { validateId } from "./helpers/validators"

/**
 * Retrieves the user's posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of user's posts
*/

export function retrieveUserPosts(userId) {
  validateId(userId, 'user id')
  
  const usersApp = users()
  const postsApp = posts()
  
  let user = usersApp.some(user => user.id === userId)
  if (!user) throw new Error(`User with ${userId} not found.`)
  
  const userPostsApp = postsApp.filter(post => post.author === userId)

  return userPostsApp.toReversed()
}
