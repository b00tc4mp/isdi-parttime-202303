import { validateUrl, validateId, validateText } from "./helpers/validators"
import { savePost, findUserById, loadPosts } from '../data'

/**
 * Creates a post by reciving the user's id, an image provided with an url or selected from the own ones (only one can be used), and a text.
 * 
 * @param {string} userId The user's id
 * @param {string} imageUrl The url of the post's image
 * @param {image} selectedImage The image selected
 * @param {*} postText The description of the post
 */

export const createPost = (userId, imageUrl, selectedImage, postText, callBack) => {
  
  if(imageUrl && selectedImage) {
    callBack(new Error('An url and an image file are entered, please enter only one of them.'))
  
    return
  }

  let postImage;
  if(imageUrl) {
    validateUrl(imageUrl)
    postImage = imageUrl
  } else {
    postImage = selectedImage
  }
  
  validateText(postText)
  
  validateId(userId, 'user id')
  
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
        image: postImage,
        text: postText,
        date: date.toLocaleDateString(),
      }
    
      savePost(post, () => callBack(null))
    })
  })
}