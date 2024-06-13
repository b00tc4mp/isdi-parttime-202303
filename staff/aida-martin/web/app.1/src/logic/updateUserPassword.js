import { validateId, validatePassword } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

/**
 * Updates user's password in database
 *
 * @param {string} userId The user's ID
 * @param {string} password The user's current password
 * @param {string} newPassword The user's new password
 * @param {string} newPasswordConfirm The user's new password
 */

export default function changePassword (
  userId,
  password,
  newPassword,
  newPasswordConfirm
) {
  validateId(userId, 'User ID')
  validatePassword(password)
  validatePassword(newPassword, 'New password')
  validatePassword(password)

  const user = findUserById(userId)

  if (!user) throw new Error('User not found 😥', { cause: 'userError' })
  if (password !== user.password) { throw new Error('Wrong password 😥', { cause: 'userError' }) }
  if (newPassword !== newPasswordConfirm) { throw new Error('New passwords do not match 😥', { cause: 'userError' }) }
  if (newPassword === password) {
    throw new Error('Your new password matches the current one 😥', {
      cause: 'userError'
    })
  }
  if (!newPasswordConfirm.length) {
    throw new Error('You have not confirm your new password 😥', {
      cause: 'userError'
    })
  }
  if (newPassword.length < 8) {
    throw new Error('Your password does not have 8 characters 😥', {
      cause: 'userError'
    })
  }

  user.password = newPassword

  saveUser(user)
}
