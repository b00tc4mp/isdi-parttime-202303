const { deleteMessage }=require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    try {
      const adminId = extractUserId(req)
      const { messageId } = req.params
  
      deleteMessage(adminId, messageId)
        .then(() => res.status(202).send())
        .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })