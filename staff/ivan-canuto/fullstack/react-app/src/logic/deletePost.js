import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Deletes a user's post.
 * 
 * @param {object} post The post's object from database.
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function deletePost(postId, userId, callBack) {
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

    callBack(null)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}/delete`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)
  
  xhr.send()
}