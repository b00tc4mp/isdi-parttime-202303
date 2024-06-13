const {
  validators: { validateId, validatePassword },
  errors: { ExistenceError, AuthError, ContentError }
} = require('com')
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

/**
 * Updates the user password
 * 
 * @param {string} userId The user id
 * @param {string} password The user password
 * @param {string} newPassword The new user password
 * @param {string} newPasswordConfirm The user password confirmation
 * 
 * @returns {Promise} A Promise that resolves when the user password is updated successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id, password, new password or new password confirmation
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal, new passwords do not match, or new password equal to the old one
 * @throws {RangeError} On password, new password or new password confirmation length lower than 6 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirm')

  if(newPassword !== newPasswordConfirm)
    throw new ContentError('The new passwords do not match.')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const matchCurrentPassword = await bcrypt.compare(password, user.password)

    if(!matchCurrentPassword) throw new AuthError('Wrong credentials.')
  
    if(password === newPassword) throw new ContentError('The new password is the same as the old one.')

    const hash = await bcrypt.hash(newPassword, 10)

    await User.updateOne(
      { _id: userId },
      { $set: { password: hash }}
    )
  })()
}