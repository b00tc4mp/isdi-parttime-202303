import { validators } from 'com'

const { validateToken, validatePassword, validateCallback } = validators


/**
 * Updates the user password.
 * 
 * @param {string} token The user id token.
 * @param {string} password The user password.
 * @param {string} newPassword The new user password.
 * @param {string} newPasswordConfirm The new user password confirmation.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserPassword(token, password, newPassword, newPasswordConfirm, callBack) {
  validateToken(token, 'user id token')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirmation')

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/newPassword`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const json = JSON.stringify({ password, newPassword, newPasswordConfirm })

    xhr.send(json)
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/newPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}