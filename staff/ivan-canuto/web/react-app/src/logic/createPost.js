import { findUserById } from "./helpers/dataManager"
import { validateUrl, validateId, validateText } from "./helpers/validators"
import { savePost, posts } from '../data'

export const createPost = (userId, postUrl, postText)=>{
  const postsApp = posts()

  validateId(userId, 'user id')
  let user = findUserById(userId)
  if (!user) throw new Error('User not found.')

  validateUrl(postUrl)
  validateText(postText)

  let id = 'post-1'
  const lastPost = postsApp[postsApp.length - 1]
  if (lastPost) id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

  let date = new Date()
  const post = {
    id,
    author: user.id,
    image: postUrl,
    text: postText,
    date: date.toLocaleDateString(),
    likes: [],
    comments: []
  }

  savePost(post)
}