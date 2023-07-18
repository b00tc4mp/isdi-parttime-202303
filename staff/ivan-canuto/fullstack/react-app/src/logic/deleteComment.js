import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} postId The post's id.
 * @param {string} commentId The comment's id.
 */

export default function deleteComment(postId, commentId) {
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}/delete`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${context.token}`
    }
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })
  })
}