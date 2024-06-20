const { modifyLyricPost } = require('../../logic')
const { extractUserId } = require('../helpers')

module.exports = (req, res) => {
    try {
        const adminId = extractUserId(req)
        const { lyricPostId } = req.params

        const { title, media, text, songInfo, visibility } = req.body

        modifyLyricPost(adminId, lyricPostId, title, media, text, songInfo, visibility)
            .then(() => res.status(201).send())
            .catch((error) => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}