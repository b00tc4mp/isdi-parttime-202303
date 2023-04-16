import { validateText, validateUrl, validateId } from "./helpers/validators.js"
import { posts, savePosts } from "../data.js"

export const updatePost = (postId, postImageUrl, postText)=>{
  validateId(postId, 'post id')
  let post = posts.find(post => post.id === postId)

  validateUrl(postImageUrl)
  validateText(postText)
  
  post.image = postImageUrl
  post.text = postText

  savePosts()
}