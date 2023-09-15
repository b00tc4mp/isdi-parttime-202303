const { extractUserId, handleErrors } = require('./helpers')
const { updateUserOccupation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { occupation } = req.body

  const promise = updateUserOccupation(userId, occupation)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})