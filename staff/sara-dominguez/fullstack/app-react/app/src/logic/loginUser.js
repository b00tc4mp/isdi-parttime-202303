import { validators } from 'com'
const { validateEmail, validatePassword } = validators
import context from './context'

/**
 * Authenticate a user by email and password
 * 
 * @param {string} email the user`s email
 * @param {string} password the user`s password
 * 
 * @returns {string} The user's id
 */

export function loginUser(email, password) {
  validateEmail(email)
  validatePassword(password)

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else
        return res.json()
          // .then(({ error: message }) => { throw new Error(message) })
          .then(body => {
            throw new Error(body.message)
          })
    })
    .then(token => {
      context.token = token
    })
}


