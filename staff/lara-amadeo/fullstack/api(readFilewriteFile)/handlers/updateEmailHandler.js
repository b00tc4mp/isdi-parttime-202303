const { extractToken } = require('../helpers')
const { updateEmail } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        const { email, newEmail } = req.body

        updateEmail(userId, email, newEmail, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}