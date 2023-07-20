import { validators, errors } from 'com'
import context from './context'

const { validateId } = validators

/**
 * Deletes a user's post.
 * 
 * @param {object} postId The post's id.
 */

export default function deletePost(postId) {
  validateId(postId, 'post id')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${context.token}`
      },
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Authorization': `Bearer ${context.token}`
  //   },
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })
  // })
}