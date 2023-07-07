const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { imageUrl, postText } = req.body

  return createPost(userId, imageUrl, postText)
    .then(result => res.send())
})