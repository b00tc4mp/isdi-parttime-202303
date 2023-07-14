import { validators } from 'com'
import context from './context'

const { validateId, validateText } = validators

/**
 * Creates a comment in post.
 * 
 * @param {object} postId The post's id.
 * @param {string} commentText The comment text entered by user.
 */

export default function createComment(postId, commentText) {
  validateId(postId, 'post id')
  validateText(commentText)

  return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/comment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${context.token}`
    },
    body: JSON.stringify({ commentText })
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ error: message }) => { throw new Error(message) })
  })
} 