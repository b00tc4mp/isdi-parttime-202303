const { 
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 * Retrieves the user by user id
 * 
 * @param {string} userId The user id 
 * @returns {Promise<object>}
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On empty user id
 * @throws {ExistenceError} On non-existing user
 */

module.exports = (userId) => {
  validateId(userId, 'user id')
  
  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new ExistenceError('User not found.')

      delete user._id
      delete user.password
      delete user.favs

      return user
    })
}