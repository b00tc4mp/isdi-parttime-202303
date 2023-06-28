const deleteComment = require('../logic/deleteComment')

module.exports = (req, res) => {
  try {
    const { postId, commentId } = req.params

    deleteComment(postId, commentId)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
    
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}