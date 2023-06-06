import { validateUrl, validateId, validateText, validateCallback } from "./helpers/validators"
import { savePost, findUserById, loadPosts } from '../data'

/**
 * Creates a post by reciving the user's id, an image provided with an url or selected from the own ones (only one can be used), and a text.
 * 
 * @param {string} userId The user's id
 * @param {string} imageUrl The url of the post's image
 * @param {image} selectedImage The image selected
 * @param {string} postText The description of the post
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const createPost = (userId, imageUrl, postText, callBack) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl)
  validateText(postText)
  validateCallback(callBack)
  
  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error('User not found.'))

      return
    }
    
    loadPosts((posts) => {
      let id = 'post-1'
      const lastPost = posts[posts.length - 1]
      if (lastPost) id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
    
      let date = new Date()
      const post = {
        id,
        author: user.id,
        image: imageUrl,
        text: postText,
        date: date.toLocaleDateString(),
        likes: [],
        visible: true,
        onSale: null,
        comments: []
      }
    
      savePost(post, () => callBack(null))
    })
  })
}