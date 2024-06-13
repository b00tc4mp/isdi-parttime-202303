const { createNewMission } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { image, tittle, info, level, difficulty,  visibility } = req.body

    return createNewMission(userId, image, tittle, info, level, difficulty,  visibility)
        .then(() => res.status(201).send())
})