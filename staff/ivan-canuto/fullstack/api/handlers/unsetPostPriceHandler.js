const { unsetPostPrice } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postId } = req.params

  const promise = unsetPostPrice(userId, postId)

  return (async () => {
    await promise

    res.send()
  })()

  // return unsetPostPrice(userId, postId)
  //   .then(() => res.send())
})