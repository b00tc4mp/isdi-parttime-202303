import { loadPosts, savePost, findUserById } from "../data"
import { validators } from 'com'

const { validateId, validateUrl, validateText, validateCallback } = validators

/**
 * Updates the post with new data.
 * 
 * @param {string} userId The user id.
 * @param {string} postId The post id.
 * @param {URL} imageUrl the url of the image.
 * @param {string} postText The text of the post.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const updatePost = (userId, postId, imageUrl, postText, callBack)=>{
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(imageUrl)
  validateText(postText)
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
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`)

  const post = { imageUrl, postText }
  const json = JSON.stringify(post)

  xhr.send(json)
}