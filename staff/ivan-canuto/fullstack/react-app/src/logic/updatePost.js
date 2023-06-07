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
  
  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error(`User not found.`))
      
      return
    }

    loadPosts(posts => {

      let post = posts.find(post => post.id === postId)

      if (!post) {
        callBack(new Error(`Post with id ${postId} not found`))

        return
      }
    
      if (post.author !== userId) {
        callBack(new Error('There must be an error, this user is not the owner of the post.'))

        return
      }
    
      post.text = postText
      post.image = imageUrl
    
      savePost(post, () => callBack(null))
    })
  })
}