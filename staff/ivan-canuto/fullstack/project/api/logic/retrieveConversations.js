const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')

module.exports = function retrieveConversations(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw new ExistenceError('User not found.')

        const conversations = await Conversation.find({ author: userId }, '_id title').lean()

        conversations.forEach(conv => {
            delete conv.conversationInputs

            conv.id = conv._id.toString()
            delete conv._id
        })

        return conversations
    })()
}
