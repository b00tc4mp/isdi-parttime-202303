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

export default function retrievePost(userId ,postId, callBack) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  
  retrievePosts(userId, (error, _posts) => {
    if (error) {
      alert(error)
      console.log(error)

      return
    }

    const post = _posts.find(post => post.id === postId)
  
    callBack(null, post)
  })
}