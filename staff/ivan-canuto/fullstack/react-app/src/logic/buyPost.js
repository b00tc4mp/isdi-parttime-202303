import { validators } from 'com'

const { validateToken, validateId, validateCallback } = validators

/**
 * Buys the post if other user wants to.
 * 
 * @param {string} token The user's id token.
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function buyPost(token, postId, callBack) {
  validateToken(token, 'user id token')
  validateId(postId, 'post id')

  if(callBack) {
    validateCallback(callBack)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 200) {
        const { response } = xhr
        const { error } = JSON.parse(response)

        callBack(new Error(error))

        return
      }
      
      callBack(null)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/buy`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/buy`, {
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