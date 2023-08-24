import { validators, errors } from 'com'
import context from './context'

const { validateId, validateText } = validators

export default function updateSuggestion(suggestionId, _title, _content) {
  validateId(suggestionId, 'suggestion id')
  validateText(_title, 'suggestion title')
  validateText(_content, 'suggestion content')

  const title = _title.trim()
  const content = _content.trim()
  
  if(title.length > 30) throw new ContentError('The title of the suggestion is too long.')
  if(content.length < 50) throw new ContentError('The content of the suggestion is too short.')
  if(content.length > 500) throw new ContentError('The content of the suggestion is too long.')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}/editSuggestion`, {
      method: 'PATCH',
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