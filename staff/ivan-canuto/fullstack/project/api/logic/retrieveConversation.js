const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')

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