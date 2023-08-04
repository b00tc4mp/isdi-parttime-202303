import { validators, errors } from 'com'
import context from './context'

const { validateId, validateText } = validators

/**
 * Creates a comment in post.
 * 
 * @param {object} postId The post's id.
 * @param {string} commentText The comment text entered by user.
 */

export default function askForResponse(conversationId, currentConversation) {
  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations/${conversationId}/askForResponse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ currentConversation })
    })

    if(res.status === 201)
      return res.json()
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
} 