import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the saved posts form database.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the array of saved post by the user.
 * 
*/

export function retrieveSavedPosts(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)
  
  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if(status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callBack(new Error(error))

      return
    }

    const { response: json } = xhr
    const { savedPosts } = JSON.parse(json)

    callBack(null, savedPosts)
  }

  xhr.onerror = () => {
    callBack(new Errorr('Connection error.'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/savedPosts`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}
