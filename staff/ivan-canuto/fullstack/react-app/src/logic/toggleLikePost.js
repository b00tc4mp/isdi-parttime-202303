import { savePost, findUserById, findPostById } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Toggles the user likes in posts.
 * 
 * @param {string} userId The user id.
 * @param {object} postId The post id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function toggleLikePost(userId, postId, callBack) {
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/toggleLike`)

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  xhr.send()
}