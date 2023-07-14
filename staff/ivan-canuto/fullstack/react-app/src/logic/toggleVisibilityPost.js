import { validators } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Toggles the visibility of the post in public or private.
 * 
 * @param {string} postId The post's id.
 */

export default function toggleVisibilityPost(postId) {
  validateId(postId,  'post id')

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/togglePostVisibility`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${context.token}`
    }
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ error: message }) => { throw new Error(message) })
  })
}