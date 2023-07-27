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

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleSave`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}