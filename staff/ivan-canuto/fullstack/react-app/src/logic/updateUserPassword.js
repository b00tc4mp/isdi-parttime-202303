import { saveUser, findUserById } from '../data'
import { validators } from 'com'

const { validateId, validatePassword, validateCallback } = validators


/**
 * Updates the user password.
 * 
 * @param {string} userId The user id.
 * @param {string} password The user password.
 * @param {string} newPassword The new user password.
 * @param {string} newPasswordConfirm The new user password confirmation.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callBack) {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirmation')
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/updateUserPassword/${userId}`)

  xhr.setRequestHeader('Content-Type', 'application/json')

  const json = JSON.stringify({ password, newPassword, newPasswordConfirm })

  xhr.send(json)
}
