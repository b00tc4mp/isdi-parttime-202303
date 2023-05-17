import { saveUser, findUserById } from '../data'
import { validateUrl, validatePassword, validateId } from './helpers/validators'

const avatarImage = document.querySelector('.avatar-image')
export default function updateUserAvatar(userId, newAvatarUrl, password, callBack) {
  
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl)
  validatePassword(password)
  
  if (newAvatarUrl === user.avatar) {
    callBack(new Error('New avatar cannot be the same as the old avatar.'))
  
    return
  }

  if (password !== user.password) {
    callBack(new Error('The password is incorrect'))

    return
  }

  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error('User not found'))

      return
    }

    user.avatar = newAvatarUrl
    saveUser(user, () => callBack(null))
  })
}
  