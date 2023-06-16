import { findUserById, loadPosts, loadUsers } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the user's posts form database.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the array of posts made by user.
 * 
*/

export function retrieveUserPosts(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)
  
  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if(status !== 200) {
      const { response: json } = xhr
      const { error } = JSON.parse(json)

      callBack(error)
    }

    const { response: json } = xhr
    const { userPosts } = JSON.parse(json)
    
    callBack(null, userPosts)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/userPosts`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}