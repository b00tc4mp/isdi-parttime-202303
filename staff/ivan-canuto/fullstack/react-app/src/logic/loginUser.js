import { validators, errors } from 'com'
import context from './context'

const { validateEmail, validatePassword } = validators

/**
 * Authenticates an user by email and password and keeps the session token in context.
 * 
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 */

export default function authenticateUser(email, password) {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if(res.status === 200) {
      const token = await res.json()

      context.token = token

      return
    }
      
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()

  // return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ email, password })
  // })
  // .then(res => {
  //   if(res.status !== 200)
  //     return res.json().then(({ message, type }) => { throw new errors[type](message) })

  //   return res.json()
  // })
  // .then(token => {
  //   context.token = token
  // })
}