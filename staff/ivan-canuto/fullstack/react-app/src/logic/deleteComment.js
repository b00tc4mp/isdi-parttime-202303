import { validators } from 'com'

const { validateToken, validateId, validateCallback } = validators

/**
 * Deletes a user's comment.
 * 
 * @param {string} token The user's id token.
 * @param {string} postId The post's id.
 * @param {string} commentId The comment's id.
 * @param {function} callBack A functio, to catch the errors and shows them to the user.
 */

export default function deleteComment(token, postId, commentId, callBack) {
  validateToken(token, 'user id token')
  validateId(postId, 'post id')
  validateId(commentId, 'comment id')

  if(callBack) {
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

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}/delete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })

      return res.json()
    })
  }
}