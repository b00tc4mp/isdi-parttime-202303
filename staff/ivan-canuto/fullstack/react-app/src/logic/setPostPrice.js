import { validators } from 'com'

const { validateToken, validateId, validateText, validateCallback } = validators

/**
 * Sets a price to the post.
 * 
 * @param {string} token The user's id token.
 * @param {string} postId The post's id.
 * @param {string} postPrice The post's price setted by the post's author.
 * @param {*} callBack A function to catch errors and display them to the user.
 */

export default function setPostPrice(token, postId, postPrice, callBack) {
  validateToken(token, 'user id token')
  validateId(postId, 'post id')
  validateText(postPrice)

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
  
    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/postPrice`)
  
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
  
    const json = JSON.stringify({ postPrice })
  
    xhr.send(json)
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/postPrice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ postPrice })
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}