require('dotenv').config()
const storeInputInDB = require('./storeInputInDB')

const userId = '64c7bc54b940807314c24e97'
const conversationId = '64ca16d82c0d5773319f6079'
const userInput = {
    role: 'user',
    content: 'buenos días'
}

try {
    storeInputInDB(userId, conversationId, userInput)
    .then(() => console.log('success'))
    .catch(console.log)
} catch (error) {
    console.log(error)
}