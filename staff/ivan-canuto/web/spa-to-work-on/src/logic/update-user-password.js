import {findUserById} from './helpers/data-manager.js'
import {validatePassword} from './helpers/validators.js'

export function updateUserPassword(email, password, newPassword, newPasswordConfirm) {

  var user = findUserById(email)
  if (!user) throw new Error('User not found')
  validatePassword(password)
  if (password !== user.password) throw new Error('The password is incorrect.');
  validatePassword(newPassword, 'new password')
  validatePassword(newPassword, 'new password confirmation')
  if (newPassword.length < 6) throw new Error('New password is too short.');
  if (newPassword === password) throw new Error('New password cannot be the same as the old password.')
  if (newPassword !== newPasswordConfirm) throw new Error('New passwords do not match.')

  user.password = newPassword
}
