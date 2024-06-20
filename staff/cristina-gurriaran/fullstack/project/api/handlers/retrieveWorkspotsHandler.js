const { extractUserId, handleErrors } = require('./helpers')
const { retrieveWorkspots } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveWorkspots(userId)

    return (async () => {
        const workspots = await promise

        res.json(workspots)
    })()
})