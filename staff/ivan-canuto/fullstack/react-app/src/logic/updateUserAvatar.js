import { saveUser, findUserById } from '../data'
import { validators } from 'com'

const { validateId, validateUrl, validatePassword, validateCallback } = validators

/**
 * Upadtes the user avatar.
 * 
 * @param {string} userId The user's id.
 * @param {string} newAvatarUrl The new avatar url.
 * @param {string} password The users's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserAvatar(userId, newAvatarUrl, password, callBack) {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl)
  validatePassword(password)
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${userId}`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const user = { newAvatarUrl, password }
  const json = JSON.stringify(user)

  xhr.send(json)
}
  