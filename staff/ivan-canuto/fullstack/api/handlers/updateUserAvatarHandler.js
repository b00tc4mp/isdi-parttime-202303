const { extractUserId, handleErrors } = require('./helpers')
const { updateUserAvatar } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { newAvatarUrl, password } = req.body

  return updateUserAvatar(userId, newAvatarUrl, password)
    .then(() => res.status(204).send())
})