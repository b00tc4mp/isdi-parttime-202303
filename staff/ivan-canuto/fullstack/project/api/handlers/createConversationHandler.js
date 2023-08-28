const { extractUserId, handleErrors } = require('./helpers')
const { createConversation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { userInput } = req.body
  
  const promise = createConversation(userId, userInput)

  return (async () => {
    const conversationId = await promise
    
    res.status(201).send(conversationId)
  })()
})