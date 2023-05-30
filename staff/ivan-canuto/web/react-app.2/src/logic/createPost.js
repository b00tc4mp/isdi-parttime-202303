import { findUserById } from "./helpers/dataManager"
import { validateUrl, validateId, validateText } from "./helpers/validators"
import { savePost, posts } from '../data'

/**
 * Creates a post by reciving the user's id, an image provided with an url or selected from the own ones (only one can be used), and a text.
 * 
 * @param {string} userId The user's id
 * @param {string} imageUrl The url of the post's image
 * @param {image} selectedImage The image selected
 * @param {*} postText The description of the post
 */

export const createPost = (userId, imageUrl, selectedImage, postText)=>{
  const postsApp = posts()

  validateId(userId, 'user id')
  let user = findUserById(userId)
  if (!user) throw new Error('User not found.')

  if(imageUrl && selectedImage) throw new Error('An url and an image file are entered, please enter only one of them.')

  let postImage;
  if(imageUrl) {
    validateUrl(imageUrl)
    postImage = imageUrl
  } else {
    postImage = selectedImage
  }
  
  validateText(postText)

  let id = 'post-1'
  const lastPost = postsApp[postsApp.length - 1]
  if (lastPost) id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

  let date = new Date()
  const post = {
    id,
    author: user.id,
    image: postImage,
    text: postText,
    date: date.toLocaleDateString(),
    comments: []
  }

  savePost(post)
}