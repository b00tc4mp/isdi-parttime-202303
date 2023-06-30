import { validators } from 'com'

const { validateToken, validateUrl, validatePassword, validateCallback } = validators

/**
 * Upadtes the user avatar.
 * 
 * @param {string} token The user's id token.
 * @param {string} newAvatarUrl The new avatar url.
 * @param {string} password The users's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserAvatar(token, newAvatarUrl, password, callBack) {
  validateToken(token, 'user id token')
  validateUrl(newAvatarUrl)
  validatePassword(password)

  if(callBack) {
    validateCallback(callBack)
    
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 204) {
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/newAvatar`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const user = { newAvatarUrl, password }
    const json = JSON.stringify(user)

    xhr.send(json)
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/newAvatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ newAvatarUrl, password })
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}
  