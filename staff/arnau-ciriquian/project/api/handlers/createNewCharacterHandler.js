const { createNewCharacter } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { characterName, avatar } = req.body

    return createNewCharacter(userId, characterName, avatar)
        .then(() => res.status(201).send())
})