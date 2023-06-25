const { extractUserId } = require('../helpers')
const {  updateEmail } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email, newEmail } = req.body

        updateEmail(userId, email, newEmail)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}