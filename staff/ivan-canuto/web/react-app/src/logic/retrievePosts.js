import { loadPosts, findUserById } from "../data"
import { validateId } from "./helpers/validators"

/**
 * Retrieves the posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of posts from database
*/

export function retrievePosts(userId, callBack) {

  validateId(userId, 'user id')

  findUserById(userId, (user) => {

    if (!user) {
      callBack(new Error(`User with ${userId} not found.`))

      return
    }
    
    loadPosts(posts => {

      callBack(null, posts.toReversed())
    })
  })
}
