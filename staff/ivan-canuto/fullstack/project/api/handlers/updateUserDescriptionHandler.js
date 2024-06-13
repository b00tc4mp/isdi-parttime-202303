const { extractUserId, handleErrors } = require('./helpers')
const { updateUserDescription } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { description } = req.body

  const promise = updateUserDescription(userId, description)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})