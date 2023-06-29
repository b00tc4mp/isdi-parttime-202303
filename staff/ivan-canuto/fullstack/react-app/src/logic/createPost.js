import { validators } from 'com'

const { validateToken, validateUrl, validateText, validateCallback } = validators

/**
 * Creates a post by reciving the user's id, an image provided with an url or selected from the own ones (only one can be used), and a text.
 * 
 * @param {string} token The user's id token.
 * @param {string} imageUrl The url of the post's image.
 * @param {image} selectedImage The image selected.
 * @param {string} postText The description of the post.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const createPost = (token, imageUrl, postText, callBack) => {
  validateToken(token, 'user id token')
  validateUrl(imageUrl)
  validateText(postText)

  console.log(imageUrl)

  if(callBack) {
    validateCallback(callBack)
  
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
      const { status } = xhr

      if(status !== 200) {
        const { response: json } = xhr
        console.log(json)
        const { error } = JSON.parse(json)
        callBack(new Error(error))

        return
      }

      callBack(null)
    }
    
    xhr.onerror = () => {
      callBack(new Error('Connection error.'))
    }
    
    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/newPost`)
    
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { imageUrl, postText }
    const json = JSON.stringify(post)

    xhr.send(json)
    
  } else {
    return fetch(`${import.meta.env.VITE_API_URL}/users/newPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ imageUrl, postText })
    })
    .then(res => {
      if(res.status !== 200)
        res.json().then(({ error: message }) => { throw new Error(message) })
    })
  }
}
