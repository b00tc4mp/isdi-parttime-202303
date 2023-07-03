const { extractUserId, handleErrors } = require('./helpers')
const { updateUserPassword } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { password, newPassword, newPasswordConfirm } = req.body

  return updateUserPassword(userId, password, newPassword, newPasswordConfirm)
    .then(() => res.send())
})