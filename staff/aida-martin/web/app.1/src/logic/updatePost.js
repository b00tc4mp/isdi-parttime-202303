import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById, findPostById } from './helpers/dataManagers'
import { savePost } from '../data'

/**
 * Updates post's data in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 * @param {string} image The post's image
 * @param {string} text The post's text
 */

export default function updatePost (userId, postId, image, text) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')
  validateUrl(image, 'Image URL')
  validateText(text, 'Text')

  const user = findUserById(userId)
  const post = findPostById(postId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })
  if (!post) throw new Error('User not found 😥', { cause: 'userError' })

  if (post.author !== userId) { throw new Error('Post not found 😥', { cause: 'userError' }) }

  post.image = image
  post.text = text

  savePost(post)
}
