const { createUpdate } = require('../../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const adminId = extractUserId(req)

        const { title, image, text, rsstext, visibility } = req.body

        createUpdate(adminId, title, image, text, rsstext, visibility)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}