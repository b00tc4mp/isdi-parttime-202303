import { validators } from 'com'
import context from './context'

const { validateId, validateText } = validators

/**
 * Sets a price to the post.
 * 
 * @param {string} postId The post's id.
 * @param {string} postPrice The post's price setted by the post's author.
 */

export default function setPostPrice(postId, postPrice) {
  validateId(postId, 'post id')
  validateText(postPrice)

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/postPrice`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${context.token}`
    },
    body: JSON.stringify({ postPrice })
  })
  .then(res => {
    if(res.status !== 200)
      return res.json().then(({ error: message }) => { throw new Error(message) })
  })
}