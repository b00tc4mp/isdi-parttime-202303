const { modifyUpdate } = require('../../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const adminId = extractUserId(req)
        const { updateId } = req.params

        const { title, image, text, rsstext, visibility } = req.body

        modifyUpdate(adminId, updateId, title, image, text, rsstext, visibility)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}