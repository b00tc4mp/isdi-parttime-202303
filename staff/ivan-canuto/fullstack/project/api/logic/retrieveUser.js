const { 
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { User } = require('../data/models')

/**
 * Retrieves the user by user id
 * 
 * @param {string} userId The user id 
 * 
 * @returns {Promise<object>} The user object
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user
 */

module.exports = (userId) => {
  validateId(userId, 'user id')

  return (async () => {
    const user = await User.findById(userId).lean()
    if(!user) throw new ExistenceError('User not found.')

    user.id = user._id.toString()
    delete user._id

    delete user.password
    delete user.favs

    return user
  })()
}