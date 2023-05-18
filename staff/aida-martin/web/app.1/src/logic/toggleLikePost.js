import { validateId } from './helpers/validators'
import { findPostById, findUserById } from './helpers/dataManagers'
import { savePost } from '../data'

/**
 * Adds or removes post's likes. Update post in database
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function toggleLikePost (userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥')

  const post = findPostById(postId)

  if (!post) throw new Error('Post not found 😥')

  if (!post.likes) {
    post.likes = [userId]
  } else {
    const index = post.likes.indexOf(userId)

    if (index < 0) {
      post.likes.push(userId)
    } else {
      post.likes.splice(index, 1)

      if (!post.likes.length) {
        delete post.likes
      }
    }
  }

  savePost(post)
}
