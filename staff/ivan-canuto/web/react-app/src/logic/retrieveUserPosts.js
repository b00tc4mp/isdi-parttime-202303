import { findUserById, loadPosts } from "../data"
import { validateCallback, validateId } from "./helpers/validators"

/**
 * Retrieves the user's posts form database
 * 
 * @param {string} userId The user's id
 * @param {function} callBack A function to catch errors and display them to the user., and returns the array of posts made by user
 * 
*/

export function retrieveUserPosts(userId, callBack) {

  validateId(userId, 'user id')
  validateCallback(callBack)
  
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
