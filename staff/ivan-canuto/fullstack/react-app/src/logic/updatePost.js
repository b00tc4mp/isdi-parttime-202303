import { validators, errors } from 'com'
import context from './context'
const { validateId, validateUrl, validateText } = validators

/**
 * Updates the post with new data.
 * 
 * @param {string} postId The post id.
 * @param {URL} imageUrl the url of the image.
 * @param {string} postText The text of the post.
 */

export const updatePost = (postId, imageUrl, postText) => {
  validateId(postId, 'post id')
  validateUrl(imageUrl)
  validateText(postText)

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/updatePost`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ imageUrl, postText })
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/updatePost`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${context.token}`
  //   },
  //   body: JSON.stringify({ imageUrl, postText })
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })
  // })
}