import { validateId, validateUrl } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

/**
 * Updates user's avatar in database
 *
 * @param {string} userId The user's ID
 * @param {string} url The user's avatar
 */

export default function updateAvatar (userId, url) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })

  user.avatar = url

  saveUser(user)
}
