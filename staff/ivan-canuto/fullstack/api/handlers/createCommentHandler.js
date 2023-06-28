const { extractUserId } = require('../helpers')
const createComment = require('../logic/createComment')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postId } = req.params
    const { commentText } = req.body

    createComment(commentText, userId, postId)
      .then(() => res.send())
      .catch(error => res.status(400).json({error: error.message}))
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}