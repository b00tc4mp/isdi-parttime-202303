const { updateUserName } = require('../../logic/users')
const { extractUserId } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        const { name } = req.body

        updateUserName(userId, name, error => {
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