import { validators } from 'com'

const { validateToken, validateCallback } = validators

/**
 * Retrieves the user's posts form database.
 * 
 * @param {string} token The user's id token.
 * @param {function} callBack A function to catch errors and display them to the user, and returns the array of posts made by user.
 * 
*/

export function retrieveUserPosts(token, callBack) {
  validateToken(token, 'user id token')

  if(callBack) {
    validateCallback(callBack)
    
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)
       
        callBack(error)
      }

      const { response: json } = xhr
      const { userPosts } = JSON.parse(json)
      
      callBack(null, userPosts)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/userPosts`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/userPosts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })

      return res.json()
    })
  }
}