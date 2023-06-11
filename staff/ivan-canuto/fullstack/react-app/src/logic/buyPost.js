import { findPostById, savePost } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Buys the post if other user wants to.
 * 
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function buyPost(postId, callBack) {
  validateId(postId)
  validateCallback(callBack)

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const { status } = xhr

    if(status !== 200) {
      const { response } = xhr
      const { error } = JSON.parse(response)

      callBack(new Error(error))

      return
    }
    
    callBack(null)
  }

  xhr.onerror = () => {
    callBack(new Error('Connection error.'))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/buyPost/${postId}`)

  xhr.send()
}