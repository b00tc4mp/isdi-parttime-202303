import { validateId } from "./helpers/validators"
import { retrievePosts } from "./retrievePosts"


export default function retrievePost(userId ,postId) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  
  const posts = retrievePosts(userId)
  const post = posts.find(post => post.id === postId)

  return post
}