const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')

/**
 * Retrieves a conversation by conversation id
 * 
 * @param {string} userId The user id 
 * @param {string} conversationId The conversation id
 * 
 * @returns {Promise<object>} The conversation object
 * 
 * @throws {TypeError} On non-string user id or conversation id
 * @throws {ContentError} On user id or conversation id not equal to 24 characters of length or not hexadecimal
 * @throws {ExistenceError} On non-existing user or conversation
 */

module.exports = function retrieveConversations(userId, conversationId) {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const conversation = await Conversation.findById(conversationId).lean()
        if(!conversation) throw new ExistenceError('Conversation not found.')

        conversation.messages.forEach(message => delete message._id)

        return conversation
    })()
}
