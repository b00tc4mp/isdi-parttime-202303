import { validateText, validateUrl, validateId } from "./helpers/validators"
import { posts, savePost } from "../data"
import { findUserById } from "./helpers/dataManager"

export const updatePost = (userId, postId, postImageUrl, postText)=>{
  const postsApp = posts()
  validateId(userId, 'user id')
  let user = findUserById(userId)
  if (!user) throw new Error(`User with id ${userId} not found.`)

  validateId(postId, 'post id')
  let post = postsApp.find(post => post.id === postId)
  if (!post) throw new Error(`Post with id ${postId} not found`)

  if (post.author !== userId) throw new Error('There must be an error, this user cannot edit this post.')

  validateUrl(postImageUrl)
  validateText(postText)
  
  post.text = postText
  post.image = postImageUrl

  savePost(post)
}