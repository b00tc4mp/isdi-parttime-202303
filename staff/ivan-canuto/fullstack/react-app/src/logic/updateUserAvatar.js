import { validators } from 'com'
import context from './context'

const { validateUrl, validatePassword } = validators

/**
 * Upadtes the user avatar.
 * 
 * @param {string} newAvatarUrl The new avatar url.
 * @param {string} password The users's password.
 */

export default function updateUserAvatar(newAvatarUrl, password) {
  validateUrl(newAvatarUrl)
  validatePassword(password)

  return fetch(`${import.meta.env.VITE_API_URL}/users/newAvatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${context.token}`
    },
    body: JSON.stringify({ newAvatarUrl, password })
  })
  .then(res => {
    if(res.status !== 204)
      return res.json().then(({ error: message }) => { throw new Error(message) })
  })
}
  