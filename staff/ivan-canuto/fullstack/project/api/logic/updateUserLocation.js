const {
    validators: { validateId, validateText },
    errors: { ExistenceError, ContentError }
  } = require('com')
  const { User } = require('../data/models')
  
  /**
   * Updates the user location
   * 
   * @param {string} userId The user id
   * @param {string} location The user location
   * 
   * @returns {Promise} A Promise that resolves when the user location is updated successfully, or rejects with an error message if the operation fails
   * 
   * @throws {TypeError} On non-string user id or user location
   * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal, or empty user location
   * @throws {ExistenceError} On non-existing user 
   */
  
  module.exports = (userId, location) => {
    validateId(userId, 'user id')
    validateText(location, 'user location')

    if(location.length > 30) throw new ContentError('The location is too long.')
  
    return (async () => {
      const user = await User.findById(userId)
      if(!user) throw new ExistenceError('User not found.')
  
      await User.updateOne(
        { _id: userId },
        { $set: { location: location }}
      )
    })()
  }