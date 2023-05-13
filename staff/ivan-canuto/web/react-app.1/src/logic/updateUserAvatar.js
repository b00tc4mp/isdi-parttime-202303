import { saveUser } from '../data'
import { findUserById } from './helpers/dataManager'
import { validateUrl, validatePassword } from './helpers/validators'

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
  