import { validateId, validateUrl } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

export default function updateAvatar (userId, url) {
  validateId(userId, 'User ID')
  validateUrl(url, 'Avatar url')

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })

  user.avatar = url

  saveUser(user)
}
