const { extractUserId, handleErrors } = require('./helpers')
const { updateUserLocation } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)
  const { location } = req.body

  const promise = updateUserLocation(userId, location)

  return (async () => {
    await promise

    res.status(204).send()
  })()
})