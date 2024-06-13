const { extractUserId, handleErrors } = require('./helpers')
const { toggleFollowUser } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { profileUserId } = req.params

  const promise = toggleFollowUser(userId, profileUserId)

  return (async () => {
    await promise

    res.send()
  })()
})