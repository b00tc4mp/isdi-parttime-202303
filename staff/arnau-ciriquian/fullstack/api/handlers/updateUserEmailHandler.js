const { updateUserEmail } = require('../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email, newEmail, newEmailConfirmation, password } = req.body

        updateUserEmail(userId, email, newEmail, newEmailConfirmation, password)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
            
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}