import { findUserById } from "./helpers/data-manager.js"
import { validateAvatarUrl, validateId, validateText } from "./helpers/validators.js"
import { posts } from '../data.js'
import { renderPost } from "./render-post.js"

export const createPost = (userId, postUrl, postText)=>{
  validateId(userId, 'user id')
  let user = findUserById(userId)
  if (!user) throw new Error('User not found.')

  validateAvatarUrl(postUrl)
  validateText(postText)

  let id = 'post-1'
  let lastPostId = posts[posts.length - 1].id
  if (lastPostId) id = 'post-' + (parseInt(lastPostId.slice(5)) + 1)

  let date = new Date()
  const post = {
    id,
    author: user.id,
    image: postUrl,
    text: postText,
    date: date.toLocaleDateString()
  }
  posts.push(post)

}