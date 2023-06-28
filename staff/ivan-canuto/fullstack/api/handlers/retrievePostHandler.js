const { extractToken } = require('../helpers')
const retrievePost = require('../logic/retrievePost')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { postId } = req.params

    retrievePost(userId, postId)
      .then(post => res.json({ post }))
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}