import { validators, errors } from 'com'
import context from './context'
const { validateId, validateText } = validators

/**
 * Updates the post with new data.
 * 
 * @param {string} postId The post id.
 * @param {string} title the title of the post.
 * @param {string} content The content (summary) of the post.
 */

export default function updatePost(postId, _title, _content) {
  validateId(postId, 'post id')
  validateText(_title, 'post title')
  validateText(_content, 'post title')
  
  const title = _title.trim()
  const content = _content.trim()

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/updatePost`, {
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