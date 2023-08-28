const { updateCharacter } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { newCharacterName, newAvatar } = req.body

    return updateCharacter(userId, newCharacterName, newAvatar)
        .then(() => res.status(204).send())
})
