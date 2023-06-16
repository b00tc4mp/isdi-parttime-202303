import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves a post form database.
 * 
 * @param {string} userId The user's id.
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the post information required.
 * 
*/

export default function retrievePost(userId ,postId, callBack) {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
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
    const { post } = JSON.parse(json)

    callBack(null, post)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/post`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}