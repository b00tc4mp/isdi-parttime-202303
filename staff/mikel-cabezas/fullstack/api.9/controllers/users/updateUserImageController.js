const { updateUserImage } = require('../../logic/users')
const { extractUserId } = require('../../helpers')


module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        const { image } = req.body

        updateUserImage(userId, image)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}