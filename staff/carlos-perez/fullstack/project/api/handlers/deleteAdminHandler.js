const { deleteAdmin }=require('../logic')
const { extractUserId } = require('./helpers')
const { handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    try {
      const userId = extractUserId(req)
  
      const { password, passwordConfirm } = req.body
  
      deleteAdmin(userId, password, passwordConfirm)
        .then(() => res.status(202).send())
        .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })