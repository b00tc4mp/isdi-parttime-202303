import { validators, errors } from 'com'
import context from './context'

const { validatePassword } = validators

/**
 * Updates the user password.
 * 
 * @param {string} password The user password.
 * @param {string} newPassword The new user password.
 * @param {string} newPasswordConfirm The new user password confirmation.
 */

export default function updateUserPassword(password, newPassword, newPasswordConfirm) {
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirmation')

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/newPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.token}`
      },
      body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    })

    if(res.status === 200)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch(`${import.meta.env.VITE_API_URL}/users/newPassword`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${context.token}`
  //   },
  //   body: JSON.stringify({ password, newPassword, newPasswordConfirm })
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })
  // })
}