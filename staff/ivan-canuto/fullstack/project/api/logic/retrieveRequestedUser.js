const { 
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
  const { User } = require('../data/models')
  
  /**
   * Retrieves the user by user id
   * 
   * @param {string} userId The user id
   * @param {string} requestedUserId The requested user id
   * 
   * @returns {Promise<object>} The user object
   * 
   * @throws {TypeError} On non-string user id or requested user id
   * @throws {ContentError} On user id or requested user id not equal to 24 characters of length or not hexadecimal
   * @throws {ExistenceError} On non-existing user or requested user
   */
  
  module.exports = (userId, requestedUserId) => {
    validateId(userId, 'user id')
    validateId(requestedUserId, 'requested user id')
  
    return (async () => {
      const user = await User.findById(userId).lean()
      if(!user) throw new ExistenceError('User not found.')
      
      const profileUser = await User.findById(requestedUserId).lean()
      if(!profileUser) throw new ExistenceError('The profile user not found.')
  
      profileUser.id = profileUser._id.toString()
      delete profileUser._id
  
      delete profileUser.password
      delete profileUser.favs
  
      return profileUser
    })()
  }