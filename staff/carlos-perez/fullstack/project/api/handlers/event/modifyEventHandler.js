const { modifyEvent } = require('../../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const adminId = extractUserId(req)
        const { eventId } = req.params

        const { title, eventDate, location, text, links, visibility } = req.body

        modifyEvent(adminId, eventId, title, eventDate, location, text, links, visibility)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}