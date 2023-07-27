import { validators, errors } from 'com'

const { validateName, validateEmail, validatePassword } = validators

/**
 * Registers a new user with a name, an email, and a password.
 * 
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    
    if(res.status === 201)
      return
    
    const { type, message } = await res.json()

    const clazz = errors[type]

    throw new clazz(message)
  })()
}
