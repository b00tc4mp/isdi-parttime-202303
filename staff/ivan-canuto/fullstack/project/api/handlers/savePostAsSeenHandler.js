const { extractUserId, handleErrors } = require('./helpers')
const { savePostAsSeen } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = savePostAsSeen(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()
})