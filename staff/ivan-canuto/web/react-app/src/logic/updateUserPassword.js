import { saveUser, findUserById } from '../data'
import { validateId, validatePassword } from './helpers/validators'

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callBack) {

  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirmation')
  if (password !== user.password) {
    callBack(new Error('The password is incorrect.'))

    return
  }
  if (newPassword.length < 6) {
    callBack(new Error('New password is too short.'))

    return
  }
  if (newPassword === password) {
    callBack(new Error('New password cannot be the same as the old password.'))

    return
  }
  if (newPassword !== newPasswordConfirm) {
    callBack(new Error('New passwords do not match.'))

    return
  }

  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error('User not found'))
      
      return
    }
    
    user.password = newPassword
    saveUser(user, () => callBack(null))
  })

}
