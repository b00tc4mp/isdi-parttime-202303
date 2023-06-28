import { validators } from 'com'

const { validateEmail, validatePassword, validateCallback } = validators

/**
 * Authenticates an user by email and password.
 * 
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @param {function} callBack A function to catch the errors and show them to the user.
 */

export default function authenticateUser(email, password, callBack) {
  validateEmail(email)
  validatePassword(password)
  validateCallback(callBack)

  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    const { status } = xhr
    
    if(status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callBack(new Error(error))

      return
    }
    
    const { response: json } = xhr
    const token = JSON.parse(json)

    callBack(null, token)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)
  
  xhr.setRequestHeader('Content-Type', 'application/json')

  const user = { email, password }
  const json = JSON.stringify(user)
  
  xhr.send(json)
}
