const { extractUserId } = require('../helpers')
const {  updatePassword } = require('../logic')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        const { password, newPassword } = req.body

        updatePassword(userId, password, newPassword, error => {
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