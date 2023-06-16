import { findUserById, findPostById, savePost } from "../data"
import { validators } from 'com'

const { validateText, validateCallback } = validators

/**
 * Creates a comment in post.
 * 
 * @param {string} commentText The comment text entered by user.
 * @param {object} userId The user's id.
 * @param {object} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function createComment(commentText, userId, postId, callBack) {
  validateText(commentText)
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
    callBack(new Error('Connection error'))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/comment`)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  const json = JSON.stringify({ commentText })
  
  xhr.send(json)
}