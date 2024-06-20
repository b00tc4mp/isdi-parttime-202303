const { extractUserId, handleErrors } = require('./helpers')
const { getFilteredWorkspots } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { districts, category, features } = req.body

    const promise = getFilteredWorkspots(userId, { districts, category, features })

    return (async () => {
        const matchedWorkspots = await promise

        res.json(matchedWorkspots)
    })()
})