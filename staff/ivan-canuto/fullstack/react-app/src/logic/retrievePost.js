import { validators } from 'com'

const { validateToken, validateId, validateCallback } = validators

/**
 * Retrieves a post form database.
 * 
 * @param {string} token The user's id token.
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the post information required.
 * 
*/

export default function retrievePost(token ,postId, callBack) {
  validateToken(token, 'user id token')
  validateId(postId, 'post id')

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
      
      const { response: json } = xhr
      const { post } = JSON.parse(json)

      callBack(null, post)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/post`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/post`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })

      return res.json()
    })
  }
}