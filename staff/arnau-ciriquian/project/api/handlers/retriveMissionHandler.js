const { retriveMission } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { missionId } = req.params

    return retriveMission(userId, missionId)
        .then(mission => res.json(mission))
})