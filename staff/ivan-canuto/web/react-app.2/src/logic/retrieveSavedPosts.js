import { posts } from "../data"
import { validateId } from "./helpers/validators"
import retrieveUser from "./retrieveUser"

/**
 * Retrieves the saved posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of saved posts
*/

export function retrieveSavedPosts(userId) {
  const postsApp = posts()
  
  validateId(userId, 'user id')
  
  const user = retrieveUser(userId)

  let savedPostsApp
  
  if(!user.favPosts)
    savedPostsApp = []
  else
    savedPostsApp = postsApp.filter(post => user.favPosts.includes(post.id))

  return savedPostsApp.toReversed()
}
