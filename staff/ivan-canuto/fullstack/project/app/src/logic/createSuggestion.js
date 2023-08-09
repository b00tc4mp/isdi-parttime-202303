import { validators, errors } from 'com'
import context from './context'

const { validateId, validateText } = validators

export default function createComment(postId, title, content) {
  validateId(postId, 'post id')
  validateText(title, 'suggestion title')
  validateText(content, 'suggestion content')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/suggestions/newSuggestion`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ title, conten })
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
} 