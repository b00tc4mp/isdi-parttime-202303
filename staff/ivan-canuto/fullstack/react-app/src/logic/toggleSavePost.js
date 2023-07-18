import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Saves the favorite posts from user.
 * 
 * @param {object} postId The post's id.
 */

export default function toggleSavePost(postId) {
  validateId(postId, 'post id')

  return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleSave`, {
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