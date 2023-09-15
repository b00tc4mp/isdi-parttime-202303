const {
    validators: { validateId },
    errors: { ExistenceError }
  } = require('com')
const { User, Conversation } = require('../data/models')

/**
 * Deletes a conversation
 * 
 * @param {string} userId The user id 
 * @param {string} conversationId The conversation id
 * 
 * @returns {Promise} A Promise that resolves when a conversation is deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string user id or conversation id
 * @throws {ContentError} On user id or conversation id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = (userId, conversationId) => {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new ExistenceError('Conversation not found.')

        await Conversation.deleteOne({ _id: conversationId })
    })()
}