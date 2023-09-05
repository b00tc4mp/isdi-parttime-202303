const { updateMission } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { missionId } = req.params
    const { image, tittle, info, level, difficulty, visibility } = req.body


    return updateMission(userId, missionId, image, tittle, info, level, difficulty, visibility)
        .then(() => res.status(204).send())
})