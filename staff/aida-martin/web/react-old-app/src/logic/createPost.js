import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { posts, savePosts } from '../data'

export default function createPost (userId, image, text) {
  validateId(userId, 'User ID')
  validateUrl(image, 'Image URL')
  validateText(text)

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })

  let id = 'post-1'

  // Con barra baja por hacer una variable "privada". Hacemos esto para no llamar a la función dos veces después en lastPost
  const _posts = posts()

  const lastPost = _posts[_posts.length - 1]

  if (lastPost) {
    id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
  }

  const post = {
    id,
    name: user.name,
    avatar: user.avatar,
    author: userId,
    image,
    text,
    date: new Date()
  }

  _posts.push(post)

  savePosts(_posts)
}
