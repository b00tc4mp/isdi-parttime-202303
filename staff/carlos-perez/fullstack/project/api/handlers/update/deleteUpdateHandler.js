const { deleteUpdate }=require('../../logic')
const { extractUserId } = require('../helpers')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    try {
      const adminId = extractUserId(req)
      const { updateId } = req.params
  
      deleteUpdate(adminId, updateId)
        .then(() => res.status(202).send())
        .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })