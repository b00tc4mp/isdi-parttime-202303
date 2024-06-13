const { setPostPrice } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { postPrice } = req.body
  const { postId } = req.params

  const promise = setPostPrice(userId, postId, postPrice)

  return (async () => {
    await promise

    res.send()
  })()

  // return setPostPrice(userId, postId, postPrice)
  //   .then(() => res.send())
})