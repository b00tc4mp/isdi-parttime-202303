const { extractUserId, handleErrors } = require('./helpers')
const { retrieveConversations } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  
  const promise = retrieveConversations(userId)

  return (async () => {
    const conversationId = await promise
    
    res.send(conversationId)
  })()
})