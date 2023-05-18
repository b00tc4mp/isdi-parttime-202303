import { loadPosts, findUserById } from "../data"
import { validateCallback, validateId } from "./helpers/validators"

/**
 * Retrieves the posts form database
 * 
 * @param {string} userId The user's id
 * @param {function} callBack A function to catch errors and display them to the user., and returns the posts array required
 * 
*/

export function retrievePosts(userId, callBack) {

  validateId(userId, 'user id')
  validateCallback(callBack)

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
