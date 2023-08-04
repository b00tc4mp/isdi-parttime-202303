const { extractUserId, handleErrors } = require('./helpers')
const { generateConversation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { userInput } = req.body
  
  const promise = generateConversation(userId, userInput)

  return (async () => {
    const conversationId = await promise
    
    res.status(201).send(conversationId)
  })()
})