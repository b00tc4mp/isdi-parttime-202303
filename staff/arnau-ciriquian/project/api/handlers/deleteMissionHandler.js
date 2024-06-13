const { deleteMission } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { missionId } = req.params

    return deleteMission(userId, missionId)
        .then(() => res.status(204).send())
})