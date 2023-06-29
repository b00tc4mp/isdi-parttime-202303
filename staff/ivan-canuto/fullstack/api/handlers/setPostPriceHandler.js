const { setPostPrice } = require('../logic')
const { extractUserId } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)
    const { postPrice } = req.body
    const { postId } = req.params

    setPostPrice(userId, postId, postPrice)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}