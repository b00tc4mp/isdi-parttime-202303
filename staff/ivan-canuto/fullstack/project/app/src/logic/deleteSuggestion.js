import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} postId The post's id.
 * @param {string} commentId The comment's id.
 */

export default function deleteComment(postId, suggestionId) {
  validateId(postId, 'post id')
  validateId(suggestionId, 'suggestion id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/suggestions/${suggestionId}/delete`, {
      method: 'DELETE',
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