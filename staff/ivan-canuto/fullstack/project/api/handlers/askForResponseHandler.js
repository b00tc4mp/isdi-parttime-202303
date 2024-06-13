const { extractUserId, handleErrors } = require('./helpers')
const { askForResponse } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { conversationId } = req.params
  const { currentConversation } = req.body
  const promise = askForResponse(userId, conversationId, currentConversation)

  return (async () => {
    const message = await promise
    
    res.status(201).send(message)
  })()
})