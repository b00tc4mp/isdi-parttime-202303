import { findUserById } from "../data";
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the name, avatar, and favorite posts of the user.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the user information required.
 * 
 */

export default function retrieveUser(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if(status !== 201) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callBack(new Error(error))

      return
    }

    const { response: json } = xhr
    const user = JSON.parse(json)

    callBack(null, user)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}`)

  xhr.send()
}