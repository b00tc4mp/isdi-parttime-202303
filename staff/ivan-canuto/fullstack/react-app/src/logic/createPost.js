import { savePost, findUserById, loadPosts } from '../data'
import { validators } from 'com'

const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Creates a post by reciving the user's id, an image provided with an url or selected from the own ones (only one can be used), and a text.
 * 
 * @param {string} userId The user's id.
 * @param {string} imageUrl The url of the post's image.
 * @param {image} selectedImage The image selected.
 * @param {string} postText The description of the post.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const createPost = (userId, imageUrl, postText, callBack) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl)
  validateText(postText)
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
  
  xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts/createPost/${userId}`)
  
  xhr.setRequestHeader('Content-Type', 'application/json')

  const post = { imageUrl, postText }
  const json = JSON.stringify(post)

  xhr.send(json)
}
