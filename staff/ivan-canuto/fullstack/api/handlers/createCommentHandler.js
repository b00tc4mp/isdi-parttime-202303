const { extractUserId } = require('./helpers')
const { createComment } = require('../logic')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { commentText } = req.body

    createComment(userId, postId, commentText)
      .then(() => res.send())
      .catch(error => res.status(400).json({error: error.message}))
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}