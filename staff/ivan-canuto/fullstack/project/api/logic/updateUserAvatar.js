require('dotenv').config()
const {
  validators: { validateId, validateUrl, validatePassword },
  errors: { ExistenceError, ContentError, AuthError }
} = require('com')
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

/**
 * Updates the user avatar
 * 
 * @param {string} userId The user id
 * @param {string} newAvatarUrl The new avatar url
 * @param {string} password The user password
 * 
 * @returns {Promise} A Promise that resolves when the user avatar is updated successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id, new avatar url or password
 * @throws {ContentError} On user id length not equal to 24 characters, empty new avatar url or the new avatar url is the same as the old one.
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

module.exports = (userId, newAvatarUrl, password) => {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl, 'new avatar url')
  validatePassword(password)

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    if(newAvatarUrl === user.avatar) throw new ContentError('New avatar is the same as the old one.')
      
    const match = bcrypt.compare(password, user.password)

    if(!match) throw new AuthError('Wrong credentials.')

    await User.updateOne(
      { _id: userId },
      { $set: { avatar: newAvatarUrl }}
    )
  })()
}