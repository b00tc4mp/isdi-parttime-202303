const { buyPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = buyPost(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()

  // return buyPost(userId, postId)
  //   .then(() => res.send())
})