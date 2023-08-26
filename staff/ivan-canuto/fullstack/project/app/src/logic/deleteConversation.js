import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} conversationId The post's id.
 */

export default function deleteConversation(conversationId) {
  validateId(conversationId, 'conversation id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/conversations/${conversationId}/deleteConversation`, {
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