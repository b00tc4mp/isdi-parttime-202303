require('dotenv').config()

const { validators: { validateId }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')
const { Configuration, OpenAIApi } = require('openai')

module.exports = function generateSummary(userId, conversationId) {
    validateId(userId, 'user id')
    validateId(conversationId, 'conversationId')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')
        
        const conversation = await Conversation.findById(conversationId).lean()
        if(!conversation) throw new ExistenceError('Conversation not found.')
        
        const conversationMessages = [...conversation.messages]

        conversationMessages.forEach(message => delete message._id)
        
        const instruction = {
            role: 'system',
            content: process.env.SUMMARY_INSTRUCTION
        }

        conversationMessages.unshift(instruction)

        const summaryMessage = {
            role: 'user',
            content: 'Generate a text summarizing describing the discussed topics and in the language in which the previous conversation has been made, whithout saying we have had a previous conversation.'
        }
        
        conversationMessages.push(summaryMessage)
        
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })
        
        const openai = new OpenAIApi(configuration)
        
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationMessages,
            presence_penalty: 0,
            frequency_penalty: 0.3
        })        

        return response.data.choices[0].message.content
    })()
}
