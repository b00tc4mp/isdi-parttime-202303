import { findUserById, findPostById } from './helpers/dataManagers'
import { deletePost, saveUser } from '../data'

export default function deletedAPost (userId, postId) {
  const user = findUserById(userId)
  const post = findPostById(postId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })
  if (!post) throw new Error('User not found 😥', { cause: 'userError' })

  if (post.author !== userId) { throw new Error('Post not found 😥', { cause: 'userError' }) }

  const index = user.saves.findIndex((savePost) => savePost === post.id)

  user.saves.splice(index, 1)

  saveUser(user)
  deletePost(post)
}
