const { extractUserId, handleErrors } = require('./helpers')
const { retrieveRequestedUser } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { requestedUserId } = req.params

  const promise = retrieveRequestedUser(userId, requestedUserId)

  return (async () => {
    const user = await promise

    res.send(user)
  })()
})