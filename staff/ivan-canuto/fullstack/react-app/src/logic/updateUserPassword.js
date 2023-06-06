import { saveUser, findUserById } from '../data'
import { validateCallback, validateId, validatePassword } from './helpers/validators'

/**
 * 
 * @param {string} userId The user id
 * @param {string} password The user password
 * @param {string} newPassword The new user password
 * @param {string} newPasswordConfirm The new user password confirmation
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callBack) {

  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirmation')
  validateCallback(callBack)

  findUserById(userId, (user) => {
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

    if (!user) {
      callBack(new Error('User not found'))
      
      return
    }
    
    user.password = newPassword
    saveUser(user, () => callBack(null))
  })
}
