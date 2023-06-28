const { retrieveToken } = require('../helpers')
const { updateAvatar } = require('../logic')


module.exports = function updateAvatarHandler(req, res) {
    try {
        const { avatar } = req.body

        const userId = retrieveToken(req)

        updateAvatar(userId, avatar)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}