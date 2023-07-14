import { validators } from 'com'

const { validateName, validateEmail, validatePassword } = validators

/**
 * Registers a new user with a name, an email, and a password.
 * 
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => {
    if(res.status !== 201)
      return res.json().then(({ error: message }) => { throw new Error(message) })
  })
}
