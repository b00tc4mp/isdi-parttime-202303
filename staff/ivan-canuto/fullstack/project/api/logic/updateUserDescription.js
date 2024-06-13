const {
    validators: { validateId, validateText },
    errors: { ExistenceError, ContentError }
  } = require('com')
  const { User } = require('../data/models')
  
  /**
   * Updates the user description
   * 
   * @param {string} userId The user id
   * @param {string} description The user description
   * 
   * @returns {Promise} A Promise that resolves when the user description is updated successfully, or rejects with an error message if the operation fails
   * 
   * @throws {TypeError} On non-string user id or user description
   * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal, or empty user description
   * @throws {ExistenceError} On non-existing user 
   */
  
  module.exports = (userId, description) => {
    validateId(userId, 'user id')
    validateText(description, 'description')

    if(description.length > 200) throw new ContentError('The description is too long.')
  
    return (async () => {
      const user = await User.findById(userId)
      if(!user) throw new ExistenceError('User not found.')
  
      await User.updateOne(
        { _id: userId },
        { $set: { description: description }}
      )
    })()
  }