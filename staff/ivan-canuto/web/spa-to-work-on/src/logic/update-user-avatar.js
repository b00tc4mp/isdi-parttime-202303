import { findUserById } from './helpers/data-manager.js'
import { validateUrl, validatePassword } from './helpers/validators.js'
import { renderPost } from './render-post.js'

const avatarImage = document.querySelector('.avatar-image')

export function updateUserAvatar(userId, newAvatarUrl, password) {
  var user = findUserById(userId)
  
    if (!user) throw new Error('User not found')
    validateUrl(newAvatarUrl)
    if (newAvatarUrl === user.avatar) throw new Error('New avatar cannot be the same as the old avatar.')
    validatePassword(password)
    if (password !== user.password) throw new Error('The password is incorrect');
  
    user.avatar = newAvatarUrl
    avatarImage.src = user.avatar
    renderPost()
  }
  