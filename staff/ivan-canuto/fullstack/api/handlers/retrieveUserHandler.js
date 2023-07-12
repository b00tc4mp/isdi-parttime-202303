const { extractUserId, handleErrors } = require('./helpers')
const { retrieveUser } = require('../logic')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  return retrieveUser(userId)
    .then(user => res.json(user))
})