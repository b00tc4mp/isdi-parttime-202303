import { validators } from 'com'

const { validateToken, validateCallback } = validators

/**
 * Retrieves the posts form database.
 * 
 * @param {string} token The user's id token.
 * @param {function} callBack A function to catch errors and display them to the user, and returns the posts array required.
 * 
*/

export function retrievePosts(token, callBack) {
  validateToken(token, 'user id token')

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
      const { posts } = JSON.parse(json)

      callBack(null, posts)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    
    xhr.send()
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })

      return res.json()
    })
  }  
}
