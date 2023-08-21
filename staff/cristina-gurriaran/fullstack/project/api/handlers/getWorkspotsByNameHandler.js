const { extractUserId, handleErrors } = require('./helpers')
const { getWorkspotsByName } = require('../logic')

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req)
    
    const { nameSearched } = req.body

    const promise = getWorkspotsByName(userId, nameSearched)

    return (async () => {
        const matchedWorkspots = await promise

        res.json(matchedWorkspots)
    })()
})