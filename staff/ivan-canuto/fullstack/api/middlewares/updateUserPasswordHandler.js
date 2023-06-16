const { extractUserId } = require('../helpers')
const updateUserPassword = require('../logic/updateUserPassword')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { password, newPassword, newPasswordConfirm } = req.body

    updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}