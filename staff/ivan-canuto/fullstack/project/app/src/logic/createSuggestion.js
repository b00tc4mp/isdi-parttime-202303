import { validators, errors } from 'com'
import context from './context'

const { validateId, validateText } = validators

export default function createSuggestion(postId, _title, _content) {
  validateId(postId, 'post id')
  validateText(_title, 'suggestion title')
  validateText(_content, 'suggestion content')
  
  const title = _title.trim()
  const content = _content.trim()

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/suggestions/newSuggestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ title, content })
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
} 