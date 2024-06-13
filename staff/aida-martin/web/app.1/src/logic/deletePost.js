import { findUserById, findPostById } from './helpers/dataManagers'
import { posts, users, savePosts, saveUsers } from '../data'

/**
 * Deletes a post and all its data, updates data in the database (users, posts)
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

export default function deletePost (userId, postId) {
  const user = findUserById(userId)
  const post = findPostById(postId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })
  if (!post) throw new Error('User not found 😥', { cause: 'userError' })

  if (post.author !== userId) { throw new Error('Post not found 😥', { cause: 'userError' }) }

  const _posts = posts()

  const index = _posts.findIndex((_post) => _post.id === post.id)

  _posts.splice(index, 1)

  savePosts(_posts)

  const _users = users()

  _users.forEach((_user) => _user.saves?.splice((_user.saves.findIndex((save) => save === post.id), 1)))

  saveUsers(_users)
  savePosts(_posts)
}
