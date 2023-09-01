const { getUserCharacter } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    return getUserCharacter(userId)
        .then(character => res.json(character))
})