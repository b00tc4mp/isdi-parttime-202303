console.debug('load registerUser')

// import { validateName, validateEmail, validatePassword, validateCallback } from "./helpers/validators.js"
// import { loadUsers, saveUsers, findUserByEmail } from "../data.js"
import { validators } from 'com'

const { validateName, validateEmail, validatePassword, validateCallback } = validators

export function registerUser(name, email, password, callback) {
  validateName(name)
  validateEmail(email)
  validatePassword(password)

  if (callback) {
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if (status !== 201) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callback(new Error(error))

        return
      }

      callback(null)
    }

    xhr.onerror = () => {
      callback(new Error('conection error'))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    xhr.setRequestHeader('Content-Type', 'application/json')

    //enviamos los datos del usuario y lo convertimos a json
    const user = { name, email, password }
    const json = JSON.stringify(user)

    xhr.send(json)

  } else
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (res.status !== 201) {
          return res.json()
            .then(({ error: message }) => { throw new Error(message) })
        }
      })
}
