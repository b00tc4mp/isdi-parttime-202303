const { retriveAdminMissions } = require('../logic')
const { extractUserId, handleErrors } = require('./helpers')

module.exports = handleErrors((req, res) => {
        const userId = extractUserId(req)

        return retriveAdminMissions(userId)
                .then(missions => res.json(missions))
})