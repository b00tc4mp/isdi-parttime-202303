import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Retrieves a post form database.
 * 
 * @param {string} postId The post's id.
 * 
*/

export default function retrievePost(postId) {
  validateId(postId, 'post id')

  return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/post`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${context.token}`
    }
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ message, type }) => { throw new errors[type](message) })

    return res.json()
  })
}