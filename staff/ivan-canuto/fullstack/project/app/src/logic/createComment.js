import { validators, errors } from 'com'
import context from './context'

const { validateId, validateText } = validators

/**
 * Creates a comment in post.
 * 
 * @param {object} postId The post's id.
 * @param {string} commentText The comment text entered by user.
 */

export default function createComment(postId, _commentText) {
  validateId(postId, 'post id')
  validateText(_commentText, 'comment text')

  const commentText = _commentText.trim()

  if(commentText.length > 200) throw new ContentError('The text of the comment is too short.')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/comment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ commentText })
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
} 