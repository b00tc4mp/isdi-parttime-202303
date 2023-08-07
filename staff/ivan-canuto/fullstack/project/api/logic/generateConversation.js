require('dotenv').config()

const { validators: { validateId, validateText }, errors: { ExistenceError } } = require('com')
const { User, Conversation } = require('../data/models')
const { Configuration, OpenAIApi } = require('openai')
const mongoose = require('mongoose')
const { mongoose: { Types: { ObjectId } } } = mongoose

module.exports = function generateConversation(userId, userInput) {
    validateId(userId, 'user id')
    validateText(userInput, 'user input')

    return (async () => {
        const user = await User.findById(userId)

        if(!user) throw new ExistenceError('User not found.')

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })

        const openai = new OpenAIApi(configuration)

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate a title for a conversation starting with ${userInput}, around 5 to 7 words of lenght`,
            max_tokens: 10,
            temperature: 0.2
        })

        const title = response.data.choices[0].text.trim()

        await Conversation.create({
            author: user._id,
            title
        })

        const conversation = await Conversation.findOne({ author: new ObjectId(userId)}).sort({ createdAt: -1 })

        return conversation.id
    })()
}
