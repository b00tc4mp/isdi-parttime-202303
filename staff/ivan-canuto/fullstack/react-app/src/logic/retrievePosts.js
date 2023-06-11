import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the posts form database.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the posts array required.
 * 
*/

export function retrievePosts(userId, callBack) {
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
    const { posts } = JSON.parse(json)

    callBack(null, posts)
  }

  xhr.onerror = () => {
    console.log(xhr);
    callBack(new Error('Connection error.'))
  }

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/retrievePosts/${userId}`)

  xhr.send()
}
