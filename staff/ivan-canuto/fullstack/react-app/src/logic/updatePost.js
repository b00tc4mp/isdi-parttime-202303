import { validators } from 'com'

const { validateToken, validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates the post with new data.
 * 
 * @param {string} token The user id token.
 * @param {string} postId The post id.
 * @param {URL} imageUrl the url of the image.
 * @param {string} postText The text of the post.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const updatePost = (token, postId, imageUrl, postText, callBack)=>{
  validateToken(token, 'user id token')
  validateId(postId, 'post id')
  validateUrl(imageUrl)
  validateText(postText)

  if(callBack) {
    validateCallback(callBack)
    
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 200) {
        const { response: json } = xhr
        const { error } = JSON.parse(json)

        callBack(new Error (error))

        return
      }

      callBack(null)
    }

    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/posts/${postId}/updatePost`)

    xhr.setRequestHeader('Content-Type', `application/json`)
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { imageUrl, postText }
    const json = JSON.stringify(post)

    xhr.send(json)
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/posts/${postId}/updatePost`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageUrl, postText })
    })
    .then(res => {
      if(res.status !== 200)
        return res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}