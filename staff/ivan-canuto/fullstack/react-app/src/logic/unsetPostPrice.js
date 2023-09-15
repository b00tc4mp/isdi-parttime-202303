import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Removes post from sale.
 * 
 * @param {string} postId The post's id.
 */

export default function unsetPostPrice(postId) {
  validateId(postId, 'post id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/notOnSalePost`, {
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

  // return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/notOnSalePost`, {
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