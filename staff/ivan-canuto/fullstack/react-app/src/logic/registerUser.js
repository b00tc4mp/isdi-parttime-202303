import { validators } from 'com'

const { validateName, validateEmail, validatePassword, validateCallback } = validators

/**
 * Registers a new user with a name, an email, and a password.
 * 
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export function registerUser(name, email, password, callBack) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  if(callBack) {
    validateCallback(callBack)

    if (!email.includes('@')) throw new Error("Email doesn't contain a '@'.")
    if (!email.includes('.')) throw new Error("Email doesn't contain a'.', try to put a dot whithin the domain part.")
    validatePassword(password)
    if (password.length < 6) throw new Error('The password is too short.')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 201) {
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
    
    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}
