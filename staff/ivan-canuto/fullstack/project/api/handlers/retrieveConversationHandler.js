const { extractUserId, handleErrors } = require('./helpers')
const { retrieveConversation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { conversationId } = req.params
  
  const promise = retrieveConversation(userId, conversationId)

  return (async () => {
    const conversation = await promise
    
    res.send(conversation)
  })()
})