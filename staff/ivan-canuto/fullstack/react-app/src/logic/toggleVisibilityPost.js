import { validators } from 'com'

const { validateToken, validateId, validateCallback } = validators

/**
 * Toggles the visibility of the post in public or private.
 * 
 * @param {string} token The user's id token.
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function toggleVisibilityPost(token, postId, callBack) {
  validateToken(token, 'user id token')
  validateId(postId,  'post id')

  if(callBack) {
    validateCallback(callBack)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr
      
      if(status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callBack(new Error(error))

        return
      }

      callBack(null)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/togglePostVisibility`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/togglePostVisibility`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}