import { savePost, findPostById } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} postId The post's id.
 * @param {string} commentId The comment's id.
 * @param {function} callBack A functio, to catch the errors and shows them to the user.
 */

export default function deleteComment(postId, commentId, callBack) {
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}/delete`)

  xhr.send()
}