import { validateId } from './helpers/validators'
import { findPostById, findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

export default function toggleSavePost (userId, postId) {
  validateId(userId, 'User ID')
  validateId(postId, 'Post ID')

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥')

  const post = findPostById(postId)

  if (!post) throw new Error('Post not found 😥')

  if (!user.saves) {
    user.saves = [postId]
  } else {
    const index = user.saves.indexOf(postId)

    if (index < 0) {
      user.saves.push(postId)
    } else {
      user.saves.splice(index, 1)

      if (!user.saves.length) {
        delete user.saves
      }
    }
  }

  saveUser(user)
}
