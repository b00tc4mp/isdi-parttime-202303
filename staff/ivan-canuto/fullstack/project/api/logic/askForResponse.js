// import { Configuration, OpenAIApi } from 'openai'
const { Configuration, OpenAIApi } = require('openai')
const { User, Conversation } = require('../data/models')
const { validators: { validateId }, errors: { ExistenceError } } = require('com')

module.exports = function askForResponse(userId, conversationId, currentConversation) {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversation id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')
        
        const conversation = await Conversation.findById(conversationId)
        if(!conversation) throw new ExistenceError('Conversation not found.')

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })

        const openai = new OpenAIApi(configuration)

        const newConversation = [...currentConversation]

        const instruction = {
            role: 'system',
            content: process.env.CONVERSATION_INSTRUCTION
        }

        newConversation.unshift(instruction)

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: newConversation,
            presence_penalty: 0,
            frequency_penalty: 0.3
        })

        const message = response.data.choices[0].message

        conversation.messages.push(message)

        await conversation.save()

        return message
    })()
}