import { saveUser } from '../data.js'
import { findUserById } from './helpers/data-manager.js'
import { validateUrl, validatePassword } from './helpers/validators.js'
import { users } from '../data.js'

const avatarImage = document.querySelector('.avatar-image')
export default function updateUserAvatar(userId, newAvatarUrl, password) {
  let user = findUserById(userId)
  
  if (!user) throw new Error('User not found')
  validateUrl(newAvatarUrl)
  if (newAvatarUrl === user.avatar) throw new Error('New avatar cannot be the same as the old avatar.')
  validatePassword(password)
  if (password !== user.password) throw new Error('The password is incorrect');

  user.avatar = newAvatarUrl
  saveUser(user)
}
  