const { extractUserId, handleErrors } = require('./helpers')
const { retrieveFavWorkspots } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)

    const promise = retrieveFavWorkspots(userId)

    return (async () => {
        const workspots = await promise

        res.json(workspots)
    })()
})