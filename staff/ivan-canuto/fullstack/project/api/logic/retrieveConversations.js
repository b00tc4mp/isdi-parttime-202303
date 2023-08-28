const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')

/**
 * Retrieves all conversations between the user and the chatbot
 * 
 * @param {string} userId The user id 
 * 
 * @returns {Promise<array>} The array of conversations
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On user id length not equal to 24 characters
 * @throws {ExistenceError} On non-existing user
 */

module.exports = function retrieveConversations(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const conversations = await Conversation.find({ author: userId }, '_id title').lean()

        conversations.forEach(conv => {
            conv.id = conv._id.toString()
            delete conv._id
        })

        return conversations.reverse()
    })()
}
