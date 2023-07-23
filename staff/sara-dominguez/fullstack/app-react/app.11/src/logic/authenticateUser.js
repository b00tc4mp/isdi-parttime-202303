// import { validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
// import { findUserByEmail } from "../data.js"
import { validators } from 'com'

const { validateEmail, validatePassword, validateCallback } = validators

/**
 * Authenticate a user by email and password
 * 
 * @param {string} email the user`s email
 * @param {string} password the user`s password
 * 
 * @returns {string} The user's id
 */

export function authenticateUser(email, password, callback) {
  validateEmail(email)
  validatePassword(password)

  if (callback) {
    validateCallback(callback)

    const xhr = new XMLHttpRequest


    xhr.onload = () => {
      const { status } = xhr

      if (status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callback(new Error(error))

        return
      }

      const { response: json } = xhr
      const token = JSON.parse(json)

      callback(null, token)
    }

    xhr.onerror = () => {
      callback(new Error('conection error'))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    //enviamos los datos del usuario y lo convertimos a json
    const user = { email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
  } else
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status !== 200)
          return res.json().then(({ error: message }) => { throw new Error(message) })

        return res.json()
      })
}


