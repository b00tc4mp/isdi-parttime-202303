const {
    validators: { validateId, validateText },
    errors: { ExistenceError, ContentError }
  } = require('com')
  const { User } = require('../data/models')
  
  /**
   * Updates the user occupation
   * 
   * @param {string} userId The user id
   * @param {string} occupation The user occupation
   * 
   * @returns {Promise} A Promise that resolves when the user occupation is updated successfully, or rejects with an error message if the operation fails
   * 
   * @throws {TypeError} On non-string user id or user occupation
   * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal, or empty user occupation
   * @throws {ExistenceError} On non-existing user 
   */
  
  module.exports = (userId, occupation) => {
    validateId(userId, 'user id')
    validateText(occupation, 'user occupation')

    if(occupation.length > 30) throw new ContentError('The occupation is too long.')
  
    return (async () => {
      const user = await User.findById(userId)
      if(!user) throw new ExistenceError('User not found.')
  
      await User.updateOne(
        { _id: userId },
        { $set: { occupation: occupation }}
      )
    })()
  }