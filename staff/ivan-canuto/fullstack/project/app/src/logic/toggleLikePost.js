import { validators, errors  } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Toggles the user likes in posts.
 * 
 * @param {object} postId The post id.
 */

export default function ªtoggleLikePost(postId) {
  validateId(postId, 'post id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleLike`, {
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