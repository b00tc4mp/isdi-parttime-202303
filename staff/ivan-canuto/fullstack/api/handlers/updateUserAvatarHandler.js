const { extractToken } = require('../helpers')
const updateUserAvatar = require('../logic/updateUserAvatar')

module.exports = (req, res) => {
  try {
    const userId = extractToken(req)
    const { newAvatarUrl, password } = req.body

    updateUserAvatar(userId, newAvatarUrl, password)
      .then(() => res.status(204).send())
      .catch(error => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}