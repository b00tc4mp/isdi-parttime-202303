const { updateUserPassword } = require('../../logic/users')
const { extractUserId } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { password, newPassword, repeatPassword } = req.body

        updateUserPassword(userId, password, newPassword, repeatPassword, error => {
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