const { updateUserEmail } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
  try {
    const userId = extractUserId(req)

    const { email, newEmail, newEmailConfirm } = req.body

    updateUserEmail(userId, email, newEmail, newEmailConfirm)
      .then(() => res.status(201).send())
      .catch((error) => res.status(400).json({ error: error.message }))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}