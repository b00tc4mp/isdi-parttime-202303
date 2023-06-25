const { extractUserId } = require('../helpers')
const {  updateAvatar } = require('../logic')

module.exports = function updateAvatarHandler(req, res) {
    try {
        const userId = extractUserId(req) 

        const { avatar } = req.body

        updateAvatar(userId, avatar)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))    
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}