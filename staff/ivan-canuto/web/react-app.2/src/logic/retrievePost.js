import { validateId } from "./helpers/validators"
import { retrievePosts } from "./retrievePosts"

/**
 * Retrieves a post form database
 * 
 * @param {string} userId The user's id
 * @param {string} postId The post's id
 * 
 * @returns {object} The post's object
*/

export default function retrievePost(userId ,postId) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  
  const posts = retrievePosts(userId)
  const post = posts.find(post => post.id === postId)

  return post
}