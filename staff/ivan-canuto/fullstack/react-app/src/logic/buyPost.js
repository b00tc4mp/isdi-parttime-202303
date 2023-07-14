import context from './context'
import { validators } from 'com'

const { validateId } = validators

/**
 * Buys the post if other user wants to.
 * 
 * @param {string} postId The post's id.
 */

export default function buyPost(postId) {
  validateId(postId, 'post id')

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/buy`, {
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