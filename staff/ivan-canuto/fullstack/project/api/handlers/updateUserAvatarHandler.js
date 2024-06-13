const { extractUserId, handleErrors } = require('./helpers')
const { updateUserAvatar } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { newAvatarUrl, password } = req.body

  const promise = updateUserAvatar(userId, newAvatarUrl, password)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})