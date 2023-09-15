const { createPost } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
  const userId = extractUserId(req)

  const { imageUrl, postText } = req.body

  const promise = createPost(userId, imageUrl, postText)

  return (async () => {
    await promise

    res.send()
  })()

  // return createPost(userId, imageUrl, postText)
  //   .then(result => res.send())
})