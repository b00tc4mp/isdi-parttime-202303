const { extractUserId } = require('../helpers')
const updateUserPassword = require('../logic/updateUserPassword')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { password, newPassword, newPasswordConfirm } = req.body

    updateUserPassword(userId, password, newPassword, newPasswordConfirm)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}