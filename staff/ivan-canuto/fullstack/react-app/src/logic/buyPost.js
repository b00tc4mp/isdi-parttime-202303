import context from './context'
import { validators, errors } from 'com'

const { validateId } = validators

/**
 * Buys the post if other user wants to.
 * 
 * @param {string} postId The post's id.
 */

export default function buyPost(postId) {
  validateId(postId, 'post id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/buy`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    })
    if(res.status === 200)
      return

    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/buy`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Authorization': `Bearer ${context.token}`
  //   }
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })
  // })
}