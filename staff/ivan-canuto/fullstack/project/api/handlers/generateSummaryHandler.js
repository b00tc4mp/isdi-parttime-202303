const { extractUserId, handleErrors } = require('./helpers')
const { generateConversation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { conversationId } = req.params
  
  const promise = generateConversation(userInput, conversationId)

  return (async () => {
    const sumamry = await promise
    
    res.status(201).send(sumamry)
  })()
})