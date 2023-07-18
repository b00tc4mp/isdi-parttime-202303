import { validators, errors  } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Toggles the user likes in posts.
 * 
 * @param {object} postId The post id.
 */

export default function toggleLikePost(postId) {
  validateId(postId, 'post id')
  
  return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleLike`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${context.token}`
    }
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })
  })
}