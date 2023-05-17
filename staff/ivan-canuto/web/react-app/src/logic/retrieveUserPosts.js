import { findUserById, loadPosts } from "../data"
import { validateId } from "./helpers/validators"

/**
 * Retrieves the user's posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of user's posts
*/

export function retrieveUserPosts(userId, callBack) {
  validateId(userId, 'user id')
  
  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error(`User with ${userId} not found.`))

      return
    }

    loadPosts(posts => {
      const userPostsApp = posts.filter(post => post.author === user.id)

      callBack(null, userPostsApp.toReversed())
    })
  })
}
