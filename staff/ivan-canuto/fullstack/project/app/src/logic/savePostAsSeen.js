import context from "./context"
import { errors, validators } from 'com'

const { validateId } = validators

/**
 * Retrieves the saved posts form database.
*/

export default function savePostAsSeen(postId) {
  validateId(postId, 'post id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/saveSeenPost`, {
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