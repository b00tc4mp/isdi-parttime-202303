const createPost = require('../logic/createPost')
const { extractToken } = require('../helpers')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { imageUrl, postText } = req.body

    createPost(userId, imageUrl, postText)
      .then(() => res.send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}