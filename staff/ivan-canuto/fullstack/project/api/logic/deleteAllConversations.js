const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
const { User, Conversation } = require('../data/models')

/**
 * Deletes all conversations with the chatbot
 * 
 * @param {string} userId The user id
 * 
 * @returns {Promise} A Promise that resolves when all conversations are deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user
 */

module.exports = (userId) => {
    validateId(userId, 'user id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        await Conversation.deleteMany({ author: userId })
    })()
}