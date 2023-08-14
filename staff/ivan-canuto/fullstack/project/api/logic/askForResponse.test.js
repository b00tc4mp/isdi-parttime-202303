require('dotenv').config()
const askForResponse = require('./askForResponse')

const userId = '64c7bc54b940807314c24e97'
const conversationId = '64ca16d82c0d5773319f6079'
const conversation = [
    {
        role: 'system',
        content: 'You are an assistant that is always happy to help.'
    },
    {
        role: 'user',
        content: 'Buenos días.'
    }
]

async function main() {
    await mongoose.connect(process.env.MONGODB_URL)

    const response = await askForResponse(userId, conversationId, conversation)

    console.log(response)
}

main().catch(console.error)

